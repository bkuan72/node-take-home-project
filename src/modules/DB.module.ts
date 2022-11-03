import AWS from 'aws-sdk';
import dynamoServiceConfigOptions from './AWS.Module';
import { ISchema } from '../interfaces/ISchema';
import { ApplicationFeatureSchema } from "../server/controllers/organization/schema/ApplicationFeatureSchema";
import { ApplicationSchema } from "../server/controllers/organization/schema/ApplicationSchema";

const TABLE_DEFINITIONS: ISchema[] = [
  ApplicationSchema,
  ApplicationFeatureSchema
];

export class DBModule {
  private createTable(tableDefinition: ISchema) {
    return new Promise((resolve, reject) => {
      const dynamodb = new AWS.DynamoDB(dynamoServiceConfigOptions);
      dynamodb
        .createTable(tableDefinition)
        .promise()
        .then(() => {
          console.log('Tables have been created');
          resolve(tableDefinition);
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  }

  private findTable(tableDefinition: ISchema) {
    return new Promise((resolve, reject) => {
      // TODO check if table exist in database
      resolve(tableDefinition);
    });
  }

  private checkTableSchema(tableDefinition: ISchema) {
    return new Promise((resolve, reject) => {
      const checkSchema = (definition: ISchema) => {
        return new Promise((res, rej) => {
          // TODO retrieve schema from database and compare, if fields are missing insert new fields
          resolve(definition);
        });
      }
      this.findTable(tableDefinition)
        .then(() => {
          checkSchema(tableDefinition).then(() => {
            resolve(tableDefinition);
          }).catch((err) => {
            reject(err);
          })
        })
        .catch((tableDefinition) => {
          if (tableDefinition) {
            this.createTable(tableDefinition)
              .then(() => {
                resolve(tableDefinition);
              })
              .catch(() => {
                reject();
              });
          }
        });
    });
  }

  public initialize() {
    return new Promise<void>((resolve, reject) => {
      const checkTable = (
        parentResolve: (value: void | PromiseLike<void>) => void,
        parentReject: (value: void | PromiseLike<void>) => void,
        idx: number
      ) => {
        if (idx > TABLE_DEFINITIONS.length) {
          parentResolve();
          return;
        }
        const tableDefinition = TABLE_DEFINITIONS[idx];

        this.checkTableSchema(tableDefinition)
          .then(() => {
            checkTable(parentResolve, parentReject, idx + 1);
          })
          .catch((err) => {
            parentReject(err);
          });
      };

      // start process of checking table schema against database
      checkTable(resolve, reject, 0);
    });
  }
}

const appDB = new DBModule();

export default appDB;
