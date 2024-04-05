import { test } from "../fixtures/fixtures";
import { UserBuilder } from "../test-data/user";

test("Verify user is able to create order with Card payment method", async ({
  mainPage,
  cart,
  checkoutPage,
  cardPaymentPage,
  orderPage,
}) => {
  const user = new UserBuilder().setShippingMethod("Pick-up in store").setPaymentMethod("Card").build();
  const product = await mainPage.addRandomItemToCart();
  await mainPage.header.verifyCartItemsCount(1);
  await mainPage.header.openCart();
  await cart.verifyProductInCart(product.productName, product.productPrice);
  await cart.clickCheckoutButton();
  await checkoutPage.verifyProductOnCheckoutPage(product.productName, product.productPrice);
  await checkoutPage.enterPersonalData(user);
  await checkoutPage.clickNextStepButton();
  await checkoutPage.enterAddressData(user);
  await checkoutPage.clickNextStepButton();
  await checkoutPage.selectShippingMethod(user.shippingMethod);
  await checkoutPage.clickNextStepButton();
  await checkoutPage.selectPaymentMethod(user.paymentMethod);
  await checkoutPage.clickCompleteOrderButton();
  await cardPaymentPage.enterCardData(user);
  await cardPaymentPage.clickPayButton();
  await orderPage.verifyOrderCreatedMessage("It's on the way!");
  await orderPage.verifyProductDetails(product.productName, product.productPrice);
  await orderPage.verifyUserDetails(user);
});

test("Verify user is able to create order with Cash on delivery payment method", async ({
  mainPage,
  cart,
  checkoutPage,
  orderPage,
}) => {
  const user = new UserBuilder().setShippingMethod("Pick-up in store").setPaymentMethod("Cash On Delivery").build();
  const product = await mainPage.addRandomItemToCart();
  await mainPage.header.verifyCartItemsCount(1);
  await mainPage.header.openCart();
  await cart.verifyProductInCart(product.productName, product.productPrice);
  await cart.clickCheckoutButton();
  await checkoutPage.verifyProductOnCheckoutPage(product.productName, product.productPrice);
  await checkoutPage.enterPersonalData(user);
  await checkoutPage.clickNextStepButton();
  await checkoutPage.enterAddressData(user);
  await checkoutPage.clickNextStepButton();
  await checkoutPage.selectShippingMethod(user.shippingMethod);
  await checkoutPage.clickNextStepButton();
  await checkoutPage.selectPaymentMethod(user.paymentMethod);
  await checkoutPage.clickCompleteOrderButton();
  await orderPage.verifyOrderCreatedMessage("It's on the way!");
  await orderPage.verifyProductDetails(product.productName, product.productPrice);
  await orderPage.verifyUserDetails(user);
});

test("Verify user is able to create order with Bank transfer payment method", async ({
  mainPage,
  cart,
  checkoutPage,
  bankDetailsPage,
  orderPage,
}) => {
  const user = new UserBuilder().setShippingMethod("Pick-up in store").setPaymentMethod("Bank Transfer").build();
  const product = await mainPage.addRandomItemToCart();
  await mainPage.header.verifyCartItemsCount(1);
  await mainPage.header.openCart();
  await cart.verifyProductInCart(product.productName, product.productPrice);
  await cart.clickCheckoutButton();
  await checkoutPage.verifyProductOnCheckoutPage(product.productName, product.productPrice);
  await checkoutPage.enterPersonalData(user);
  await checkoutPage.clickNextStepButton();
  await checkoutPage.enterAddressData(user);
  await checkoutPage.clickNextStepButton();
  await checkoutPage.selectShippingMethod(user.shippingMethod);
  await checkoutPage.clickNextStepButton();
  await checkoutPage.selectPaymentMethod(user.paymentMethod);
  await checkoutPage.clickCompleteOrderButton();
  await bankDetailsPage.selectNedbankProvider();
  await bankDetailsPage.enterBankDetails(user);
  await bankDetailsPage.clickSignInButton();
  await bankDetailsPage.approveTransaction();
  await bankDetailsPage.verifyPaymentMessage("Payment successful");
  await orderPage.verifyOrderCreatedMessage("It's on the way!");
  await orderPage.verifyProductDetails(product.productName, product.productPrice);
  await orderPage.verifyUserDetails(user);
});

test("Verify user is able to create order with Payflex payment method", async ({
  mainPage,
  cart,
  checkoutPage,
  payflexPage,
  orderPage,
}) => {
  const user = new UserBuilder().setShippingMethod("Pick-up in store").setPaymentMethod("PayFlex").build();
  const product = await mainPage.addRandomItemToCart();
  await mainPage.header.verifyCartItemsCount(1);
  await mainPage.header.openCart();
  await cart.verifyProductInCart(product.productName, product.productPrice);
  await cart.clickCheckoutButton();
  await checkoutPage.verifyProductOnCheckoutPage(product.productName, product.productPrice);
  await checkoutPage.enterPersonalData(user);
  await checkoutPage.clickNextStepButton();
  await checkoutPage.enterAddressData(user);
  await checkoutPage.clickNextStepButton();
  await checkoutPage.selectShippingMethod(user.shippingMethod);
  await checkoutPage.clickNextStepButton();
  await checkoutPage.selectPaymentMethod(user.paymentMethod);
  await checkoutPage.clickCompleteOrderButton();
  await payflexPage.switchPaymentTypeToNow();
  await payflexPage.enterEmail(user.personal.email);
  await payflexPage.acceptTermsAndConditions();
  await payflexPage.proceedToCardPayment();
  await payflexPage.enterCardData(user);
  await payflexPage.confirmPayment();
  await payflexPage.verifyPaymentMessage("Payment successful. Nice one!");
  await payflexPage.clickReturnToMerchantButton();
  await orderPage.verifyOrderCreatedMessage("It's on the way!");
  await orderPage.verifyProductDetails(product.productName, product.productPrice);
  await orderPage.verifyUserDetails(user);
});
