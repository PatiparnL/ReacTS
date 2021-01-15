import { AxiosResponse } from "axios";
import { HttpClient } from "../utils/httpClient";

export class AuthorizedService extends HttpClient {

    constructor() {
        super({
          branch: '',
          forward: '',
          refer: '',
          sender: '',
          signature: ''
        });
    }

    public async Authorized(token: string | null): Promise<any> {
        try
        {
            let url = `/node/authorized?token=${token}&endpoint=${process.env.REACT_APP_ROUTE_API_ENDPOINT_AUTHORIZEDSERVICE}`;
            const res: AxiosResponse<any> = await this.get<any, AxiosResponse<any>>(url);
            return this.success<any>(res);
        } catch (error) {
            throw error;
        }
    }
}

export const authService = new AuthorizedService();