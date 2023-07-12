import { AppApiService } from 'src/api/AppApiService';

import { GetProductsRequestType } from 'src/types/requests';
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

  async getCartItems(ids: string[]): Promise<[null, GetCartItems] | [unknown]> {
    return this.axiosCall<GetCartItems>({
      method: 'get',
      url: `/products/cart/${ids.join(',')}`,
    });
  }
}

export const api = new ApiService();
