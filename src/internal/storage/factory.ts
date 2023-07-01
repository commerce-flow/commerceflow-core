import envs from '../../../config/envs';
import BaseStorageAdapter from './adapters';
import AirtableAdapter from './adapters/airtable';

const StorageFactory = {
  getStorage: (options: Record<string, unknown>): BaseStorageAdapter => {
    return new AirtableAdapter(options.token as string, options.workspaceId as string);
  },
};

export default StorageFactory;
