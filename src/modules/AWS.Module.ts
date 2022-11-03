import { ServiceConfigurationOptions } from "aws-sdk/lib/service";


const dynamoServiceConfigOptions : ServiceConfigurationOptions = {
    accessKeyId: 'key',
    secretAccessKey: 'secret',
    region: "us-west-2",
    endpoint: "http://localhost:8000"
};


export default dynamoServiceConfigOptions;
