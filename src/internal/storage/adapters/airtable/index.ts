import Airtable from 'airtable';
import BaseStorageAdapter from '..';
import axios, { AxiosInstance } from 'axios';
import AirtableMigrations from './migrations';

class AirtableAdapter implements BaseStorageAdapter {
  private airtable: Airtable;
  private httpClient: AxiosInstance;

  constructor(private token: string, private workspaceId: string) {
    this.airtable = new Airtable({ apiKey: this.token });

    this.httpClient = axios.create({
      baseURL: 'https://api.airtable.com/v0/',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }

  async init(): Promise<Record<string, unknown>> {
    const migrations = new AirtableMigrations(this.httpClient, this.workspaceId);
    const baseId = await migrations.runAllMigrations();

    return {
      baseId,
    };
  }
}

export default AirtableAdapter;
