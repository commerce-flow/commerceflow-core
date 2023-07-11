import BaseStorageAdapter from '../storage/adapters';

abstract class BaseRepository {
  constructor(protected storageAdapter: BaseStorageAdapter) {}
}

export default BaseRepository;
