import { AxiosRequestConfig } from 'axios';
import { http } from 'boot/axios';

interface IConstructor {
  slag?: string;
}

export class AppApiService {
  private readonly slag?: string;

  public constructor(payload?: IConstructor) {
    this.slag = payload?.slag;
  }

  protected async axiosCall<T>(
    config: AxiosRequestConfig
  ): Promise<[null, T] | [unknown]> {
    try {
      config.baseURL = this.slag
        ? http.defaults.baseURL + this.slag
        : http.defaults.baseURL;
      const { data } = await http.request<T>(config);
      return [null, data];
    } catch (e) {
      return [e];
    }
  }
}
