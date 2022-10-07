export interface ProductI{
  _id:string;
  name:string;
  id_category:[
    name:string,
    _id:string
];
  purchase_price:number;
  sale_price:number;
  quantity: number;
}
