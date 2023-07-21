import { TableNames } from '../../../../../models/base';
import { AirtableMigration } from '../../migrations-base';
import AirtableMigrationsUtils from '../../migrations-utils';
import * as schema from './migrations-schema.json';

class Migrations implements AirtableMigration {
  up(utils: AirtableMigrationsUtils): Promise<string> {
    throw new Error('Method not implemented.');
  }
  tableName = TableNames.Migrations;

  getSchema(): any[] {
    return schema;
  }
}

export default Migrations;
