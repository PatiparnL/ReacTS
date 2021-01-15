import { AxiosResponse } from "axios";
import { HttpClient } from "../utils/httpClient";
const dataConfig = require('./json/config.json');

export class JsonServerService extends HttpClient {
    constructor() {
        super({
            branch: '',
            forward: '',
            refer: '',
            sender: '',
            signature: ''
        });

    }

    public async Get(): Promise<any> {
        try {
            let url = `${process.env.REACT_APP_JSON_SERVER}/cards`;
            const reponse: AxiosResponse<any> = await this.get<any, AxiosResponse<any>>(url);
            console.log('----- GetConfig -----')
            console.log(reponse)
            if ( reponse.status == undefined || reponse.status == 404)
                return dataConfig.cards;
            return this.success<any>(reponse);
        } catch (error) {
            throw error;
        }
    }

    public async GetById(id: number): Promise<any> {
        try {
            let url = `${process.env.REACT_APP_JSON_SERVER}/cards/${id}`;
            const res: AxiosResponse<any> = await this.get<any, AxiosResponse<any>>(url);
            return this.success<any>(res);
        } catch (error) {
            throw error;
        }
    }

    public post(url: string, data: any): Promise<any> {
        url = `${process.env.REACT_APP_JSON_SERVER}/cards`;
        return this.post(url, data);
    }

    public Put(id: number, data: any): Promise<any> {
        try {
            let url = `${process.env.REACT_APP_JSON_SERVER}/cards/${id}`;
            return this.put(url, data);
        } catch (error) {
            throw error;
        }
    }

}

export const jsonServerService = new JsonServerService();