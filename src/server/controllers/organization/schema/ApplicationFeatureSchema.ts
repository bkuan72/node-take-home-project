import { ISchema } from '../../../../interfaces/ISchema';

export const ApplicationFeatureSchema: ISchema = {
    TableName: 'application_features',
    KeySchema: [
        { AttributeName: 'application', KeyType: 'HASH' },
        { AttributeName: 'uuid', KeyType: 'RANGE' },
    ],
    AttributeDefinitions: [
        { AttributeName: 'application', AttributeType: 'S' },
        { AttributeName: 'uuid', AttributeType: 'S' },
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
    },
};
