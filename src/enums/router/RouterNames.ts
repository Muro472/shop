import { CategoryType } from 'src/utils/categories';

export enum RouterNames {
  APP_ROOT_PATH = 'APP_ROOT_PATH',

  APP_HOME_VIEW = 'APP_HOME_VIEW',

  APP_SHOP_VIEW = 'APP_SHOP_VIEW',

  APP_ITEM_VIEW = 'APP_ITEM_VIEW',

  APP_ORDER_VIEW = 'APP_ORDER_VIEW',

  APP_ORDER_PERSONAL_DATA_VIEW = 'APP_ORDER_PERSONAL_DATA_VIEW',

  APP_ORDER_INFORMATION_VIEW = 'APP_ORDER_INFORMATION_VIEW',

  APP_ITEM_DEMO_VIEW = 'APP_ITEM_DEMO_VIEW',

  APP_ORDER_SUCCESS_VIEW = 'APP_ORDER_SUCCESS_VIEW',

  APP_ORDER_ERROR_VIEW = 'APP_ORDER_ERROR_VIEW',

  APP_ORDER_SIMPLE_SUCCESS_VIEW = 'APP_ORDER_SIMPLE_SUCCESS_VIEW',
}

export interface RouterParams {
  [RouterNames.APP_HOME_VIEW]: { lang: string };
  [RouterNames.APP_ROOT_PATH]: never;
  [RouterNames.APP_SHOP_VIEW]: { type: CategoryType };
  [RouterNames.APP_ITEM_VIEW]: { id: string };
  [RouterNames.APP_ORDER_VIEW]: never;
  [RouterNames.APP_ORDER_PERSONAL_DATA_VIEW]: never;
  [RouterNames.APP_ORDER_INFORMATION_VIEW]: never;
  [RouterNames.APP_ITEM_DEMO_VIEW]: never;
  [RouterNames.APP_ORDER_SUCCESS_VIEW]: { id: string };
  [RouterNames.APP_ORDER_ERROR_VIEW]: never;
}
