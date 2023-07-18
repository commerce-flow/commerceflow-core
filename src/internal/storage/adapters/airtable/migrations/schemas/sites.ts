import { TableNames } from '../../../../models/base';

const SitesSchema = {
  name: TableNames.Sites,
  schema: [
    {
      type: 'singleLineText',
      name: 'externalId',
    },
    {
      type: 'singleLineText',
      name: 'name',
    },
    {
      type: 'singleLineText',
      name: 'isActive',
    },
    {
      type: 'singleLineText',
      name: 'shortName',
    },
    {
      type: 'multilineText',
      name: 'rawPayload',
    },
  ],
};

export default SitesSchema;
