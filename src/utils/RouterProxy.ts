import { useRouter } from 'vue-router';
import { RouterParams } from 'src/enums/router/RouterNames';
const router = useRouter();

export const overritedRouterPush = <T extends keyof RouterParams>(
  name: T,
  params: RouterParams[T]
): void => {
  router.push({
    name,
    params: params as never,
  });
};
