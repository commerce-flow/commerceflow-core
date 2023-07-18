export interface BaseModel {
  id: string;
  _tableName: string;
}

export const TableNames = {
  Users: 'users',
  Authorizations: 'authorizations',
  Sites: 'sites',
};

export const DatabaseName = 'CommerceFlow';
