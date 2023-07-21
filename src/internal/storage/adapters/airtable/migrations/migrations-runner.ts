import AirtableMigrationsUtils from './migrations-utils';
import * as manifest from './schemas/manifest.json';
import takeRight from 'lodash/takeRight';
import migrations from './schemas';
import { AirtableMigration } from './migrations-base';

class MigrationsRunner {
  static async runAllMigrations(utils: AirtableMigrationsUtils): Promise<Array<string>> {
    // const lastMigration = await utils.getLastMigrationId();
    const lastMigration = '1';
    const { schemas }: any = manifest;

    const schemaList = Object.keys(schemas);
    // Todo - check if length of array is less than manifest list and error if it is
    const pendingMigrationKeys = takeRight(schemaList, schemaList.length - parseInt(lastMigration, 10));

    const pendingMigrations = pendingMigrationKeys.map((key) => {
      const { name } = schemas[key];
      const migration: AirtableMigration = new (<any>migrations)[name]();

      // migration.up() - TODO - call this
    });
    console.log({ pendingMigrations });
    return [];
  }
}

export default MigrationsRunner;
