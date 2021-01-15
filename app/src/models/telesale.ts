export interface TaskProduct_Request {
    application: string,
    productgroupcode: string | undefined,
    saleschannel: string,
    effectivedate: string,
    expiredate: string | null,
    conditions: {
        [key: string]: string
    }
}

export interface TaskProduct_Response {
    groupname: string,
    code: string,
    img: string,
    categorykey: number,
    imgtype: ImageType[]
    company: Companys[]
}

export interface ImageType {
    type: string,
    img: string
}

export interface Companys {
    name: string,
    description: string,
    code: string,
    img: string,
    producttype: string[]
}

export interface TaskCompany_Request {

}

export interface TaskCompany_Response {
    companyName: string,
    plan: number,
    productGroupName: string,
    detail: Detail[]
}

export interface Detail {
    year1: string,
    year2: string,
    year3: string,
}

export interface TaskHierarchy_Request {
    code: string;
}

export interface TaskHierarchy_Response {
    sProductHierarchyID: number;
    sParentProductHierarchyID: number;
    sProductHierarchyName: string;
    level: number;
    path: string;
}

export interface IHierarchy {
    level: number;
    parentProductHierarchyID: number;
}


export interface TaskInsurerDetail_Request {

}

export interface TaskInsurerDetail_Response {
    companyname: string;
    productkey: string;
    icon: string;
    producttypename: string;
    productname: string;
    premium: string;
    premiummode: string;
    maxpolicy: number;
    coverageshortdetails: CoverageDetail[];
    coveragealldetails: CoverageDetail[];
}

export interface CoverageDetail {
    coverageid: number,
    coveragetext: string,
    coveragevalue: string,
    order: number
}
