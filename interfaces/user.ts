export type ShippingMethod = "Home Delivery" | "Pick-up in store";
export type PaymentMethod = "Card" | "Cash On Delivery" | "Bank Transfer" | "PayFlex";

export interface User {
  personal: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
  };
  address: {
    address: string;
    city: string;
    state: string;
    postalCode: string;
  };
  shippingMethod: ShippingMethod;
  paymentMethod: PaymentMethod;
  cardDetails: {
    cardHolder: string;
    cardNumber: string;
    monthExpirationDate: string;
    yearExpirationDate: string;
    cvv: string;
  };
  bankDetails: {
    username: string;
    password: string;
  };
}
