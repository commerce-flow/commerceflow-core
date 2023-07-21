import { TableNames } from '../../../../../models/base';
import { AirtableMigration } from '../../migrations-base';
import AirtableMigrationsUtils from '../../migrations-utils';

class SitesSchema implements AirtableMigration {
  tableName = TableNames.Sites;
  up(utils: AirtableMigrationsUtils): Promise<string> {
    throw new Error('Method not implemented.');
  }
}

export default SitesSchema;
