import Airtable, { FieldSet, Record as AirtableRecord } from 'airtable';
import BaseStorageAdapter from '..';
import axios, { AxiosInstance } from 'axios';
import AirtableMigrations from './migrations';
import { AirtableBaseResponse, AirtableBaseType } from '../../../../types/airtable';
import { DatabaseName } from '../../models/base';

class AirtableAdapter implements BaseStorageAdapter {
  private airtable: Airtable;
  private httpClient: AxiosInstance;
  private currentData: any;

  constructor(private token: string, private workspaceId: string, private baseId?: string) {
    this.airtable = new Airtable({ apiKey: this.token });

    this.httpClient = axios.create({
      baseURL: 'https://api.airtable.com/v0/',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }

  async init(): Promise<Record<string, unknown>> {
    const atBaseRes = await this.httpClient.get<AirtableBaseResponse>('/meta/bases');
    const { bases = [] } = atBaseRes.data;

    let baseFound: AirtableBaseType | undefined = undefined;

    bases.forEach((base: AirtableBaseType) => {
      if (base.name === DatabaseName) {
        baseFound = base;
      }
    });

    let baseId = '';
    if (!baseFound) {
      const migrations = new AirtableMigrations(this.httpClient, this.workspaceId);
      baseId = await migrations.runAllMigrations();
    } else {
      baseId = (baseFound as AirtableBaseType)?.id;
    }

    return {
      baseId,
    };
  }

  private normalizeAirtableRecords(record: AirtableRecord<FieldSet>): Record<string, unknown> {
    const { fields, ...rest } = record._rawJson;
    return {
      ...rest,
      ...fields,
    };
  }

  private parseQueryObject(fields: Record<string, unknown>) {
    return Object.keys(fields)
      .map((key) => `{${key}} = "${fields[key]}"`)
      .join(',');
  }

  getBaseTable(tableName: string) {
    if (!this.baseId) {
      throw new Error('Missing airtable config: baseId.');
    }

    return this.airtable.base(this.baseId as string).table(tableName);
  }

  async createRecord<Args, Res>(tableName: string, data: Args): Promise<Res> {
    const table = this.getBaseTable(tableName);
    const record = await table.create(data as {});
    const id = record.getId();

    return { id, createdTime: record._rawJson.createdTime } as Res;
  }

  async getRecordByFields(tableName: string, fields: Record<string, unknown>): Promise<BaseStorageAdapter> {
    const table = this.getBaseTable(tableName);

    const query = this.parseQueryObject(fields);

    const records = await table
      .select({
        filterByFormula: query,
      })
      .all();

    this.currentData = records.map(this.normalizeAirtableRecords);

    return this;
  }

  one<Res>(): Res {
    return this.currentData[0];
  }

  many<Res>(): Res[] {
    return this.currentData;
  }

  getRecordById<Res>(tableName: string, id: string): Promise<Res> {
    throw new Error('Method not implemented.');
  }

  async updateRecordById<Args extends {}, Res extends {}>(tableName: string, id: string, newData: Args): Promise<Res> {
    const table = this.getBaseTable(tableName);

    const res = await table.update(id, newData);

    return this.normalizeAirtableRecords(res) as Res;
  }

  async existsByQuery(tableName: string, fields: Record<string, unknown>): Promise<boolean> {
    const table = this.getBaseTable(tableName);

    const query = this.parseQueryObject(fields);

    const records = await table
      .select({
        filterByFormula: query,
      })
      .all();
    return records.length > 1;
  }
}

export default AirtableAdapter;
