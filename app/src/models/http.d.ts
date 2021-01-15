export interface HttpHeader {
    sender: string;
    refer: string;
    branch: string; 
    forward: string | null; 
    signature: string;
}