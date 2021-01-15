export interface Company {
    name: string,
    image: string 
}

export interface ProductCampaign {
    productId: number;
    productMainId: number;
    name: string;
    image: any;
    companies: Company[];
}