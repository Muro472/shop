import { RouterNames } from 'src/enums/router/RouterNames';

export type ParamsType = {
  [key: string]: string | number;
};

export type PageRouteType = {
  name: string;
  params?: ParamsType;
};

export type FPageRouteType = (params?: ParamsType) => PageRouteType;

const usePageRoute = () => {
  const langLink: FPageRouteType = (params?): PageRouteType => ({
    name: RouterNames.APP_ROOT_PATH,
    params: params,
  });

  return {
    langLink,
  };
};

export default usePageRoute;
