export interface GetProductsRequestType {
  category: string;
  page: number;
  limit: number;
}

export interface IProductsToOrder {
  productId: string;
  quantity: number;
}

export interface CreateOrderRequestType {
  name: string;
  surname: string;
  email: string;
  phone: string;
  products: IProductsToOrder[];
  amount: number;
  address: string;
  apartment: string;
  country: string;
  city: string;
  postalCode: string;
  status: string;
}
