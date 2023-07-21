import { TableNames } from '../../../../../models/base';
import { AirtableMigration } from '../../migrations-base';
import AirtableMigrationsUtils from '../../migrations-utils';

class UsersSchema implements AirtableMigration {
  tableName = TableNames.Users;
  up(utils: AirtableMigrationsUtils): Promise<string> {
    throw new Error('Method not implemented.');
  }
}

export default UsersSchema;
