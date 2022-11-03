/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

// import {EntityModel} from "./entity.model";
import * as express from 'express';
import Controller from "../../../interfaces/controller.interface";
import DataNotFoundException from "../../../exceptions/DataNotFoundException";
import NoDataException from "../../../exceptions/NoDataExceptions";
import validationDTOtMiddleware from "../../../middleware/validation.DTO.middleware";

import PostDataFailedException from "../../../exceptions/PostDataFailedException";


export class EntitiesController implements Controller{
  public path='/entities';
  public router= express.Router();
  // private entities = new EntityModel();

  constructor() {
      this.initializeRoutes();
  }

  public initializeRoutes() {
    // this.router.post(this.path, validationDTOtMiddleware(entities_schema), this.newEntity);
    // this.router.get(this.path+'/byId/:id', this.findById);

    return;
  }

  // newEntity  = (request: express.Request, response: express.Response, next: express.NextFunction) => {
  //     this.entities.create(request.body).then((respEntityDTO) => {
  //       if (respEntityDTO) {
  //           response.send(respEntityDTO);
  //         } else {
  //           next(new PostDataFailedException())
  //         }
  //     })
  // };

  // findById  = (request: express.Request, response: express.Response, next: express.NextFunction) => {
  //   this.entities.findById(request.params.id).then((respEntityDTO) => {
  //     if (respEntityDTO) {
  //       response.send(respEntityDTO);
  //     } else {
  //       next(new DataNotFoundException(request.params.id))
  //     }
  //   })
  // }

  // getAll  = (request: express.Request, response: express.Response, next: express.NextFunction) => {
  //   this.entities.getAll().then((respEntityDTOArray) => {
  //     if (respEntityDTOArray) {
  //       response.send(respEntityDTOArray);
  //     } else {
  //       next(new NoDataException())
  //     }
  //   })
  // }

  // update  = (request: express.Request, response: express.Response, next: express.NextFunction) => {
  //   this.entities.updateById(request.params.id, request.body).then((respEntityDTO) => {
  //     if (respEntityDTO) {
  //       response.send(respEntityDTO);
  //     } else {
  //       next(new DataNotFoundException(request.params.id))
  //     }
  //   })
  // }
}