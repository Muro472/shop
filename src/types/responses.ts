export interface IProductFromList {
  brand: string;
  category: string;
  createdAt: string;
  desc: string;
  img: string;
  price: number;
  title: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

export type GetProductsResponseType = IProductFromList[];
