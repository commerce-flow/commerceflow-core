import AirtableMigrationsUtils from './migrations-utils';

export interface AirtableMigration {
  tableName: string;
  up(utils: AirtableMigrationsUtils): Promise<string>;
}
