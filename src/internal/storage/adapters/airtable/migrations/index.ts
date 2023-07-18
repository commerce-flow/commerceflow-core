import { AxiosInstance } from 'axios';
import migrations from './schemas';
import { DatabaseName } from '../../../models/base';

class AirtableMigrations {
  constructor(private httpClient: AxiosInstance, private workspaceId: string) {}

  async createBase(): Promise<string> {
    const resp = await this.httpClient.post('meta/bases', {
      name: DatabaseName,
      workspaceId: this.workspaceId,
      tables: Object.values(migrations).map(({ name, schema }) => {
        return {
          name,
          fields: schema,
        };
      }),
    });

    return resp.data.id;
  }

  async runMigrations(baseId: string): Promise<string> {
    const tables = Object.values(migrations).map(({ name, schema }) => ({
      name,
      fields: schema,
    }));
    console.log({ tables });

    const tablesRes = await Promise.allSettled(tables.map((table) => this.httpClient.post(`meta/bases/${baseId}/tables`, table)));
    // TODO - Check for status code 422 from airtable which will mean the table has been created already

    return '';
  }
}

export default AirtableMigrations;
