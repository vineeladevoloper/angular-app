import { Product } from "../../../product/product";

export class ProductResponse{
    public id?: number;
    public name?: string;
    public imageUrl: string | any;
    public description?: string;
    public price?: number;
    public productEmail?: string;
    public categoryId?: number;
    public quantity?: number;
}

class ProductList{
    public products?: ProductResponse;
    public quantity?: number;
}
export class CartResponse{
    public productItems?: ProductList[];
    public price?: number;
}