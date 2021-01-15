import { HttpClient } from "../utils/httpClient";
import { TaskProduct_Request, TaskHierarchy_Request, TaskInsurerDetail_Response, TaskInsurerDetail_Request } from "../models/telesale";
const dataMock = require('./json/mock.json');

export class TeleSaleService extends HttpClient {
  constructor() {
    super({
      branch: "",
      forward: "",
      refer: "",
      sender: "",
      signature: "",
    });
  }

  public async GetTaskProduct(req: TaskProduct_Request | undefined): Promise<any> {
    try {
      let url = `${process.env.REACT_APP_ROUTE_API}INSTaskTelesales/v1/taskproduct/`;
      let reponse = await this.post(url, req)
      console.log('----- GetTaskProduct -----')
      console.log(reponse)
      if (reponse.status == 404 || reponse.headers.responsecode != 200)
        return { data: dataMock.TaskProduct }
      return reponse;
    } catch (error) {
      throw error;
    }
  }

  // public async GetTaskProductHierarchy(req: TaskHierarchy_Request | undefined): Promise<any> {
  //   try {
  //     let url = `${process.env.REACT_APP_ROUTE_API}/INSTaskTelesales/v1/taskproducthierarchy/`;
  //     let reponse = await this.post(url, req)
  //     console.log('----- GetTaskHierarchy -----')
  //     console.log(reponse)
  //     if (reponse.status == 404 || reponse.headers.responsecode != 200)
  //       return { data: dataMock.TaskHierarchy }
  //     return reponse;
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  public async GetTaskInsurerDetail(req: TaskInsurerDetail_Request | undefined): Promise<any> {
    try {
      let url = `${process.env.REACT_APP_ROUTE_API}/INSTaskTelesales/v1/taskinsurerdetail/`;
      let reponse = await this.post(url, req)
      console.log('----- GetTaskInsurerDetail -----')
      console.log(reponse)
      if (reponse.status == 404 || reponse.headers.responsecode != 200)
        return { data: dataMock.TaskInsurerDetail }
      return reponse;
    } catch (error) {
      throw error;
    }
  }

}

export const teleSaleService = new TeleSaleService();
