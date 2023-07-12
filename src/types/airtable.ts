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

const Constants = {};
