import { AxiosInstance } from 'axios';
import migrations from './schemas';
import { DatabaseName, TableNames } from '../../../models/base';
import { AirtableCreateTableResponse } from '../../../../../types/airtable';
import { MigrationsError } from '../../../../../errors/database';

class AirtableMigrationsUtils {
  constructor(private httpClient: AxiosInstance, private workspaceId: string, private baseId: string) {}

  async createBase(): Promise<string> {
    const migrationSchema = new migrations.MigrationsSchema();
    const resp = await this.httpClient.post('meta/bases', {
      name: DatabaseName,
      workspaceId: this.workspaceId,
      tables: [
        {
          name: migrationSchema.tableName,
          fields: migrationSchema.getSchema(),
        },
      ],
    });

    return resp.data.id;
  }

  async createTable(name: string, fields: []): Promise<string> {
    const { data } = await this.httpClient.post<AirtableCreateTableResponse>(`meta/bases/${this.baseId}/tables`, {
      name,
      fields,
    });

    return data.id;
  }

  async getLastMigrationId(): Promise<string> {
    const { data } = await this.httpClient.get<{ records: any[] }>(
      `${this.baseId}/${TableNames.Migrations}?pageSize=${1}&sort[0][field]=migrationId&sort[0][direction]=desc`
    );
    if (data.records.length === 0) {
      throw new MigrationsError('Migrations could not be found');
    }

    return data.records[0].fields.migrationId;
  }
}

export default AirtableMigrationsUtils;
