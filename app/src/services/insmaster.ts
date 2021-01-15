import { AxiosResponse } from "axios";
import { HttpClient } from "../utils/httpClient";
const dataMock = require('./json/mock.json');

export class InsMasterService extends HttpClient {
    constructor() {
        super({
            branch: "",
            forward: "",
            refer: "",
            sender: "",
            signature: "",
        });
    }

    public async GetOccupationGroup(): Promise<any> {
        try {
            let url = `${process.env.REACT_APP_ROUTE_API}insmaster/v1/occupationgroup`;
            let reponse = await this.get(url)
            console.log('----- GetOccupationGroup -----')
            console.log(reponse)
            return reponse;
        } catch (error) {
            throw error;
        }
    }

    public async GetOccupationByGroup(groupid: string): Promise<any> {
        try {
            let url = `${process.env.REACT_APP_ROUTE_API}insmaster/v1/occupationbygroup/${groupid}`;
            let reponse = await this.get(url)
            console.log('----- GetOccupationByGroup -----')
            console.log(reponse)
            return reponse;
        } catch (error) {
            throw error;
        }
    }
}

export const insMasterService = new InsMasterService();
