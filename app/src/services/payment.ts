import { HttpClient } from "../utils/httpClient";
import { TaskCreditCardType_Response,  TaskPayType_Response } from "../models/payment";
const dataMock = require('./json/mock.json');

export class PaymentService extends HttpClient {
  constructor() {
    super({
      branch: "",
      forward: "",
      refer: "",
      sender: "",
      signature: "",
    });
  }

  public async GetPayType(): Promise<any> {
    try {
      let url = `${process.env.REACT_APP_ROUTE_API}Payment/v1/paytype`;
      const reponse = await this.get(url)
      if (reponse.status == 404 || reponse.headers.responsecode != 200)
        return { data: dataMock.TaskPayment.PayType }
      return reponse;
    } catch (error) {
      throw error;
    }
  }
  public async GetCreditCardType(): Promise<any> {
    try {
      let url = `${process.env.REACT_APP_ROUTE_API}Payment/v1/creditcard/IOS`;
      const reponse = await this.get(url)
      console.log('GetCreditCardType ',reponse)
      if (reponse.status == 404 || reponse.headers.responsecode != 200)
        return { data: dataMock.TaskPayment.CreditCardType }
      return reponse;
    } catch (error) {
      throw error;
    }
  }
}

export const paymentService = new PaymentService();
