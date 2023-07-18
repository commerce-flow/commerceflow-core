import { TableNames } from '../../../../models/base';

const AuthorizationsSchema = {
  name: TableNames.Authorizations,
  schema: [
    {
      type: 'singleLineText',
      name: 'access_token',
    },
    {
      type: 'multilineText',
      name: 'rawPayload',
    },
  ],
};

export default AuthorizationsSchema;
