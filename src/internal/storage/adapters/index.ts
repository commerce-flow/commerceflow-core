import BaseRepository from '../../repos/base';

export default interface BaseStorageAdapter {
  setupDb(): Promise<Record<string, unknown>>;
  createRecord<Args, Res>(tableName: string, data: Args): Promise<Res>;
  getRecordByFields(tableName: string, fields: Record<string, unknown>): Promise<BaseStorageAdapter>;
  getRecordById<Res>(tableName: string, id: string): Promise<Res>;
  one<Res>(): Res;
  many<Res>(): Res[];
  updateRecordById<Args extends {}, Res extends {}>(tableName: string, id: string, newData: Args): Promise<Res>;
  existsByQuery(tableName: string, fields: Record<string, unknown>): Promise<boolean>;
}
