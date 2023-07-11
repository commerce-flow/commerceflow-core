import envs from '../../../config/envs';
import BaseStorageAdapter from './adapters';
import AirtableAdapter from './adapters/airtable';

const StorageAdapterFactory = {
  getStorage: (options?: Record<string, unknown>): BaseStorageAdapter => {
    let creds: any = options;
    if (!options) {
      creds = envs.airtable();
    }

    return new AirtableAdapter(creds.token as string, creds.workspaceId as string, creds.baseId);
  },
};

export default StorageAdapterFactory;
