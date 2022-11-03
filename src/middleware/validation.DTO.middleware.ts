
import * as express from 'express';
import HttpException from '../exceptions/HttpException';
import DTOGenerator from '../modules/ModelGenerator';
import SysLog from '../modules/SysLog';
import { ISchema } from '../interfaces/ISchema';


/**
 * This middleware validate that the incoming data matches the schema
 * @param dto_schema schema
 * @returns
 */
function validationDTOMiddleware<T>(dto_schema: ISchema): express.RequestHandler {
  return (req, res, next) => {
    const errors = DTOGenerator.validateDTOSchema(dto_schema, req.body);
    if (errors.length > 0) {
      // TODO need to further improve error handing
        const errStr = JSON.stringify(errors);
        SysLog.error(errStr);
        next(new HttpException(400, errStr));
    } else {
        next();
    }
  };
}

export default validationDTOMiddleware;