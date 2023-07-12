import { AxiosInstance } from 'axios';
import migrations from './schemas';
import { DatabaseName } from '../../../models/base';

class AirtableMigrations {
  constructor(private httpClient: AxiosInstance, private workspaceId: string) {}

  async runAllMigrations(): Promise<string> {
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
}

export default AirtableMigrations;
