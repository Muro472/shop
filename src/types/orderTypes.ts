export type OrderStep =
  | 'personalData'
  | 'orderInformation'
  | 'paymentInformation';

export interface IPersonalData {
  name: string;
  surname: string;
  email: string;
  phone: string;
}

export interface IOrderInformation {
  address: string;
  apartment: string;
  country: string;
  city: string;
  postalCode: string;
}

export interface IPaymentInformation {
  cardNumber: string;
  cardName: string;
  cardDate: string;
  cardCVC: string;
}
