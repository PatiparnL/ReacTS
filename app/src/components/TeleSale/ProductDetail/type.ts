export interface Field {
    order: number;
    name: string;
    lable: string;
    type: string;
    elementType: string;
    dataField: string;
    required: boolean;
    readOnly: boolean;
    dropdownApi: string,
    dropdownData: DropdownData[],
    sm: any;
    xs: any;
    fullWidth: boolean;
    width: number;
}

export interface DropdownData {
    value: string;
    text: string;
}

export interface ProductForm {
    id: number;
    productName: string;
    category: string;
    title: string;
    productkey: string[];
    fields: Field[];
    node: Node;
}

export interface Node {
    title: string;
    fields: Field[];
}
