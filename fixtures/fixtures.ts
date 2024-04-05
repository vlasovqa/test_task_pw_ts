import { test as baseTest, expect } from "@playwright/test";
import { MainPage } from "../page-objects/main-page";
import { Cart } from "../page-objects/cart";
import { CheckoutPage } from "../page-objects/checkout-page";
import { CardPaymentPage } from "../page-objects/card-payment-page";
import { OrderPage } from "../page-objects/order-page";
import { BankDetailsPage } from "../page-objects/bank-details-payment-page";
import { PayflexPage } from "../page-objects/payflex-payment-page";

export const test = baseTest.extend<{
  mainPage: MainPage;
  cart: Cart;
  checkoutPage: CheckoutPage;
  cardPaymentPage: CardPaymentPage;
  orderPage: OrderPage;
  bankDetailsPage: BankDetailsPage;
  payflexPage: PayflexPage;
}>({
  mainPage: async ({ page }, use) => {
    const mainPage = new MainPage(page);
    await mainPage.goto();
    const cart = await mainPage.header.openCart();
    await cart.clearCart();
    await use(new MainPage(page));
  },
  cart: async ({ page }, use) => {
    await use(new Cart(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
  cardPaymentPage: async ({ page }, use) => {
    await use(new CardPaymentPage(page));
  },
  orderPage: async ({ page }, use) => {
    await use(new OrderPage(page));
  },
  bankDetailsPage: async ({ page }, use) => {
    await use(new BankDetailsPage(page));
  },
  payflexPage: async ({ page }, use) => {
    await use(new PayflexPage(page));
  },
});

export { expect } from "@playwright/test";
