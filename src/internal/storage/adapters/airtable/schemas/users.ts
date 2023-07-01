import { TableNames } from '../../../models/base';

const UserSchema = {
  name: TableNames.Users,
  schema: [
    {
      type: 'singleLineText',
      name: '_id',
    },
    {
      type: 'singleLineText',
      name: 'fullName',
    },
    {
      type: 'email',
      name: 'email',
    },
    {
      description: 'Encrypted user password, this field must be protected and never exposed.',
      type: 'multilineText',
      name: 'password',
    },
    {
      description: 'Role used to determine permission level of the user',
      type: 'singleSelect',
      name: 'role',
      options: {
        choices: [
          {
            name: 'admin',
          },
        ],
      },
    },
    {
      description: 'This field will contain the status of the user, whether they are active or inactive',
      type: 'singleSelect',
      name: 'status',
      options: {
        choices: [
          {
            name: 'active',
          },
          {
            name: 'disabled',
          },
        ],
      },
    },
    {
      description: "Contains the date and time of the user's last login",
      type: 'dateTime',
      name: 'lastLogin',
      options: {
        timeZone: 'utc',
        dateFormat: {
          format: 'YYYY-MM-DD',
          name: 'iso',
        },
        timeFormat: {
          format: 'HH:mm',
          name: '24hour',
        },
      },
    },
  ],
};

export default UserSchema;
