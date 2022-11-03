import { ISchema } from '../interfaces/ISchema';
import Util from './Utils.module';


/**
 * This class component is mean to contain logic for validating/creating
 * object based on the schema definition
 */
class ModelGenerator {

/**
 * This function check if the incoming data matches the schema
 * @param schema schema of the DTO
 * @param dto DTO data
 * @returns error message
 */
  public validateDTOSchema( schema: ISchema, dto: any ): string[] {

    const errorMsg: string[] = [];

    schema.KeySchema.map((attribute) => {
        let error;
        if (!Util.hasProperty(dto, attribute.AttributeName)) {
            error = 'Missing Attribute Name ' + attribute.AttributeName;
        }
        if (error) {
            errorMsg.push(error);
        }
    })

    return errorMsg;
  }
}

const DTOGenerator = new ModelGenerator();

export default DTOGenerator;
