import { AxiosInstance } from 'axios';
import migrations from './schemas';

class AirtableMigrations {
  constructor(private httpClient: AxiosInstance, private workspaceId: string) {}

  async runAllMigrations(): Promise<string> {
    const resp = await this.httpClient.post('meta/bases', {
      name: 'CommerceFlow',
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
