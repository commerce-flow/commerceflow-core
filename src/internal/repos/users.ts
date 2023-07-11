import BaseStorageAdapter from '../storage/adapters';
import { TableNames } from '../storage/models/base';
import { UsersModel } from '../storage/models/users';
import BaseRepository from './base';

class UsersRepository extends BaseRepository {
  private table: string = TableNames.Users;

  constructor(protected storageAdapter: BaseStorageAdapter) {
    super(storageAdapter);
  }

  async createUser(data: Partial<UsersModel>): Promise<Partial<UsersModel>> {
    const resp = await this.storageAdapter.createRecord<Partial<UsersModel>, { id: string }>(this.table, {
      ...data,
    });

    return {
      id: resp.id,
      ...data,
    };
  }

  async getUserByEmail(email: string): Promise<UsersModel> {
    const resp = await this.storageAdapter.getRecordByFields(this.table, {
      email,
    });

    return resp.one<UsersModel>();
  }

  async updateUser(id: string, newUserData: Partial<UsersModel>): Promise<UsersModel> {
    return this.storageAdapter.updateRecordById<Partial<UsersModel>, UsersModel>(this.table, id, newUserData);
  }

  async checkUserExistsByEmail(email: string): Promise<boolean> {
    return this.storageAdapter.existsByQuery(this.table, { email });
  }
}

export default UsersRepository;
