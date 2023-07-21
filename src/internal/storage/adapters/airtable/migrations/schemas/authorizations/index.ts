import { TableNames } from '../../../../../models/base';
import { AirtableMigration } from '../../migrations-base';
import AirtableMigrationsUtils from '../../migrations-utils';

class AuthorizationsSchema implements AirtableMigration {
  tableName = TableNames.Authorizations;
  up(utils: AirtableMigrationsUtils): Promise<string> {
    throw new Error('Method not implemented.');
  }
}

export default AuthorizationsSchema;
