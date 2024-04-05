import { PaymentMethod, ShippingMethod, User } from "../interfaces/user";
import { name, phone, internet, address, finance, datatype } from "faker";

export class UserBuilder {
  private firstName = name.firstName();
  private lastName = name.lastName();
  private user: User = {
    personal: {
      firstName: this.firstName,
      lastName: this.lastName,
      phoneNumber: phone.phoneNumber("+27#########"),
      email: internet.email(),
    },
    address: {
      address: address.streetAddress(),
      city: address.city(),
      state: address.state(),
      postalCode: address.zipCode(),
    },
    shippingMethod: "Home Delivery",
    paymentMethod: "Card",
    cardDetails: {
      cardHolder: `${this.firstName} ${this.lastName}`,
      cardNumber: "4242424242424242",
      cvv: finance.creditCardCVV(),
      monthExpirationDate: `0${datatype.number({ min: 1, max: 9 })}`,
      yearExpirationDate: String(datatype.number({ min: 25, max: 35 })),
    },
    bankDetails: {
      username: this.firstName,
      password: internet.password(),
    },
  };

  setShippingMethod(shippingMethod: ShippingMethod): UserBuilder {
    this.user.shippingMethod = shippingMethod;
    return this;
  }

  setPaymentMethod(paymentMethod: PaymentMethod): UserBuilder {
    this.user.paymentMethod = paymentMethod;
    return this;
  }

  build(): User {
    return this.user;
  }
}
