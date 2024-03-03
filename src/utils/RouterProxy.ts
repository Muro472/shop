import { RouteLocationRaw } from 'vue-router';
import { RouterParams } from 'src/enums/router/RouterNames';

export const overwriteRouterPush = <T extends keyof RouterParams>(
  name: T,
  params?: RouterParams[T]
): RouteLocationRaw => {
  return {
    name,
    params: params as never,
  } as RouteLocationRaw;
};
