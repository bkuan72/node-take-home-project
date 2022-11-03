/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

// import {OrganisationModel} from "./Organisation.model";
import * as express from 'express';
import Controller from "../../../interfaces/controller.interface";


export class OrganisationsController implements Controller{
  public path='/Organisations';
  public router= express.Router();
  // private Organisations = new OrganisationModel();

  constructor() {
      this.initializeRoutes();
  }

  public initializeRoutes() {
    // this.router.post(this.path, validationDTOtMiddleware(Organisations_schema), this.newOrganisation);
    // this.router.get(this.path+'/byId/:id', this.findById);

    return;
  }

  // newOrganisation  = (request: express.Request, response: express.Response, next: express.NextFunction) => {
  //     this.Organisations.create(request.body).then((respOrganisationDTO) => {
  //       if (respOrganisationDTO) {
  //           response.send(respOrganisationDTO);
  //         } else {
  //           next(new PostDataFailedException())
  //         }
  //     })
  // };

  // findById  = (request: express.Request, response: express.Response, next: express.NextFunction) => {
  //   this.Organisations.findById(request.params.id).then((respOrganisationDTO) => {
  //     if (respOrganisationDTO) {
  //       response.send(respOrganisationDTO);
  //     } else {
  //       next(new DataNotFoundException(request.params.id))
  //     }
  //   })
  // }

  // getAll  = (request: express.Request, response: express.Response, next: express.NextFunction) => {
  //   this.Organisations.getAll().then((respOrganisationDTOArray) => {
  //     if (respOrganisationDTOArray) {
  //       response.send(respOrganisationDTOArray);
  //     } else {
  //       next(new NoDataException())
  //     }
  //   })
  // }

  // update  = (request: express.Request, response: express.Response, next: express.NextFunction) => {
  //   this.Organisations.updateById(request.params.id, request.body).then((respOrganisationDTO) => {
  //     if (respOrganisationDTO) {
  //       response.send(respOrganisationDTO);
  //     } else {
  //       next(new DataNotFoundException(request.params.id))
  //     }
  //   })
  // }
}