import { AppApiService } from 'src/api/AppApiService';

import {
  GetProductsRequestType,
  CreateOrderRequestType,
} from 'src/types/requests';
import {
  GetProductsResponseType,
  IProductFromList,
  GetCartItems,
} from 'src/types/responses';

class ApiService extends AppApiService {
  async getProducts(
    payload: GetProductsRequestType
  ): Promise<[null, GetProductsResponseType] | [unknown]> {
    return this.axiosCall<GetProductsResponseType>({
      method: 'get',
      url: '/products',
      params: payload,
    });
  }

  async getProductById(
    id: string
  ): Promise<[null, IProductFromList] | [unknown]> {
    return this.axiosCall<IProductFromList>({
      method: 'get',
      url: `/products/find/${id}`,
    });
  }

  async orderSuccess(id: string): Promise<[null, unknown] | [unknown]> {
    return this.axiosCall<unknown>({
      method: 'post',
      url: `/orders/${id}/success`,
    });
  }

  async getCartItems(ids: string[]): Promise<[null, GetCartItems] | [unknown]> {
    return this.axiosCall<GetCartItems>({
      method: 'get',
      url: `/products/cart/${ids.join(',')}`,
    });
  }

  async createWithCard(
    payload: string
  ): Promise<[null, HTMLElement] | [unknown]> {
    return this.axiosCall<HTMLElement>({
      method: 'post',
      url: `/orders/${payload}/pay`,
      data: payload,
    });
  }

  async createOrder(
    payload: CreateOrderRequestType
  ): Promise<[null, unknown] | [unknown]> {
    return this.axiosCall<unknown>({
      method: 'post',
      url: '/orders',
      data: payload,
    });
  }
}

export const api = new ApiService();
