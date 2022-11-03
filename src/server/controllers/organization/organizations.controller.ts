/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

// import {OrganizationModel} from "./Organization.model";
import * as express from 'express';
import DataNotFoundException from '../../../exceptions/DataNotFoundException';
import NoDataException from '../../../exceptions/NoDataExceptions';
import PostDataFailedException from '../../../exceptions/PostDataFailedException';
import Controller from "../../../interfaces/controller.interface";
import validationDTOMiddleware from '../../../middleware/validation.DTO.middleware';
import { OrganizationModel } from './organization.model';
import { OrganizationSchema } from './schema/OrganizationSchema';


export class OrganizationsController implements Controller{
  public path='/organizations';
  public router= express.Router();
  private Organizations = new OrganizationModel();

  constructor() {
      this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.post(this.path, validationDTOMiddleware(OrganizationSchema), this.newOrganization);
    this.router.get(this.path+'/:id', this.findById);

    return;
  }

  newOrganization  = (request: express.Request, response: express.Response, next: express.NextFunction) => {
      this.Organizations.create(request.body).then((respOrganizationDTO) => {
        if (respOrganizationDTO) {
            response.send(respOrganizationDTO);
          } else {
            next(new PostDataFailedException())
          }
      })
  };

  findById  = (request: express.Request, response: express.Response, next: express.NextFunction) => {
    this.Organizations.findById(request.params.id).then((respOrganizationDTO) => {
      if (respOrganizationDTO) {
        response.send(respOrganizationDTO);
      } else {
        next(new DataNotFoundException(request.params.id))
      }
    })
  }

  getAll  = (request: express.Request, response: express.Response, next: express.NextFunction) => {
    this.Organizations.getAll().then((respOrganizationDTOArray) => {
      if (respOrganizationDTOArray) {
        response.send(respOrganizationDTOArray);
      } else {
        next(new NoDataException())
      }
    })
  }

  update  = (request: express.Request, response: express.Response, next: express.NextFunction) => {
    this.Organizations.updateById(request.params.id, request.body).then((respOrganizationDTO) => {
      if (respOrganizationDTO) {
        response.send(respOrganizationDTO);
      } else {
        next(new DataNotFoundException(request.params.id))
      }
    })
  }
}