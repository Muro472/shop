import { useRouter, RouteLocationRaw } from 'vue-router';
import { RouterParams } from 'src/enums/router/RouterNames';
const router = useRouter();

export const overwriteRouterPush = <T extends keyof RouterParams>(
  name: T,
  params?: RouterParams[T]
): RouteLocationRaw => {
  return {
    name,
    params: params as never,
  } as RouteLocationRaw;
};
