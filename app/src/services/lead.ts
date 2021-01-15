import { HttpClient } from "../utils/httpClient";

export class LeadService extends HttpClient {
  constructor() {
    super({
      branch: "",
      forward: "",
      refer: "",
      sender: "",
      signature: "",
    });
  }

  public async GetMaritalStatus(): Promise<any> {
    try {
      let url = `${process.env.REACT_APP_ROUTE_API}lead/v1/maritalstatus`;
      let reponse = await this.get(url)
      console.log('----- GetMaritalStatus -----')
      console.log(reponse)
      return reponse;
    } catch (error) {
      throw error;
    }
  }

  public async GetTitleName(): Promise<any> {
    try {
      let url = `${process.env.REACT_APP_ROUTE_API}lead/v2/titlename`;
      let reponse = await this.get(url)
      console.log('----- GetTitleName -----')
      console.log(reponse)
      return reponse;
    } catch (error) {
      throw error;
    }
  }

}

export const leadService = new LeadService();
