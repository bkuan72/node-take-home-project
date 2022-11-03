import { ISchema } from '../../../../interfaces/ISchema';

export const OrganizationSchema: ISchema = {
    TableName: 'applications',
    KeySchema: [

        { AttributeName: 'uuid', KeyType: 'RANGE' },
        { AttributeName: 'name', KeyType: 'S' },
    ],
    AttributeDefinitions: [
        { AttributeName: 'uuid', AttributeType: 'S' },
        { AttributeName: 'name', AttributeType: 'S' },
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
    },
};
