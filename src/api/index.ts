import { AppApiService } from 'src/api/AppApiService';

import { GetProductsRequestType } from 'src/types/requests';
import { GetProductsResponseType } from 'src/types/responses';

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
  ): Promise<[null, GetProductsResponseType] | [unknown]> {
    return this.axiosCall<GetProductsResponseType>({
      method: 'get',
      url: `/products/${id}`,
    });
  }
}

export const api = new ApiService();
