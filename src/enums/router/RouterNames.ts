import { CategoryType } from 'src/utils/categories';

export enum RouterNames {
  APP_ROOT_PATH = 'APP_ROOT_PATH',

  APP_HOME_VIEW = 'APP_HOME_VIEW',

  APP_SHOP_VIEW = 'APP_SHOP_VIEW',
}

export interface RouterParams {
  [RouterNames.APP_HOME_VIEW]: { lang: string };
  [RouterNames.APP_ROOT_PATH]: void;
  [RouterNames.APP_SHOP_VIEW]: { type: CategoryType };
}
