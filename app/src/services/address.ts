import { AxiosResponse } from "axios";
import { HttpClient } from "../utils/httpClient";

export class AddressService extends HttpClient {
  constructor() {
    super({
      branch: "",
      forward: "",
      refer: "",
      sender: "",
      signature: "",
    });
  }

  public async GetProvince(): Promise<any> {
    try {
      let url = `${process.env.REACT_APP_ROUTE_API}Address/V1/Province`;
      const res: AxiosResponse<any> = await this.get<any, AxiosResponse<any>>(
        url
      );
      return this.success<any>(res);
    } catch (error) {
      throw error;
    }
  }

  public async GetDistrict(provinceKey: number): Promise<any> {
    try {
      let url = `${process.env.REACT_APP_ROUTE_API}Address/V1/District/${provinceKey}`;
      const res: AxiosResponse<any> = await this.get<any, AxiosResponse<any>>(
        url
      );
      return this.success<any>(res);
    } catch (error) {
      throw error;
    }
  }

  public async GetSubDistrict(districtKey: number): Promise<any> {
    try {
      let url = `${process.env.REACT_APP_ROUTE_API}Address/V1/SubDistrict/${districtKey}`;
      const res: AxiosResponse<any> = await this.get<any, AxiosResponse<any>>(
        url
      );
      return this.success<any>(res);
    } catch (error) {
      throw error;
    }
  }

   public async GetZipCode(subDistrictKey: number): Promise<any> {
    try {
      let url = `${process.env.REACT_APP_ROUTE_API}Address/V1/ZipCode/${subDistrictKey}`;
      const res: AxiosResponse<any> = await this.get<any, AxiosResponse<any>>(
        url
      );
      return this.success<any>(res);
    } catch (error) {
      throw error;
    }
  }
}

export const addressService = new AddressService();
