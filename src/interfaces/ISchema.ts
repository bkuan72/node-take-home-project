
export interface ISchemaKey {
  AttributeName: string;
  KeyType: string;
}
export interface ISchemaAttributeDef {
  AttributeName: string;
  AttributeType: string;
}
export interface ISchemaProvThroughput {
  ReadCapacityUnits: number;
  WriteCapacityUnits: number;
}
export interface ISchema {
  TableName: string;
  KeySchema: ISchemaKey[];
  AttributeDefinitions: ISchemaAttributeDef[];
  ProvisionedThroughput: ISchemaProvThroughput;
}
