export interface AirtableBaseResponse {
  bases: [
    {
      id: string;
      name: string;
      permissionLevel: string;
    }
  ];
  offset: string;
}

export interface AirtableBaseType {
  id: string;
  name: string;
  permissionLevel: string;
}

export interface AirtableCreateTableResponse {
  description: string;
  fields: [
    {
      description: string;
      id: string;
      name: string;
      type: string;
    }
  ];
  id: string;
  name: string;
  primaryFieldId: string;
  views: [
    {
      id: string;
      name: string;
      type: string;
    }
  ];
}

const Constants = {};
