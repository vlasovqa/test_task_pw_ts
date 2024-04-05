import { Locator, Page, test, expect } from "@playwright/test";
import { PaymentMethod, ShippingMethod, User } from "../interfaces/user";

export class CheckoutPage {
  readonly page: Page;
  private readonly productsList: Locator;
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly emailInput: Locator;
  private readonly phoneNumberInput: Locator;
  private readonly nextStepButton: Locator;
  private readonly addressInput: Locator;
  private readonly cityInput: Locator;
  private readonly stateInput: Locator;
  private readonly postalCodeInput: Locator;
  private readonly shippingMethodOption: (option: ShippingMethod) => Locator;
  private readonly paymentMethodOption: (option: PaymentMethod) => Locator;
  private readonly completeOrderButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productsList = page.locator(".items-start");
    this.firstNameInput = page.locator("#first_name");
    this.lastNameInput = page.locator("#last_name");
    this.emailInput = page.locator("#email");
    this.phoneNumberInput = page.locator("#phone_number");
    this.nextStepButton = page.getByRole("button", { name: "Next Step" });
    this.addressInput = page.locator("#address");
    this.cityInput = page.locator("#city");
    this.stateInput = page.locator("#state");
    this.postalCodeInput = page.locator("#postal_code");
    this.shippingMethodOption = (shippingMethod) => page.getByText(shippingMethod);
    this.paymentMethodOption = (paymentMethod) => page.getByLabel(paymentMethod);
    this.completeOrderButton = page.getByRole("link", { name: "Complete Order" });
  }

  async verifyProductOnCheckoutPage(productName: string, productPrice: string): Promise<void> {
    await test.step(`User should see ${productName} with ${productPrice} price on checkout page`, async () => {
      await expect(this.productsList).toContainText(productName);
      await expect(this.productsList).toContainText(productPrice);
    });
  }

  async enterPersonalData(user: User): Promise<void> {
    await test.step(`User enters personal information ${JSON.stringify(user.personal)}`, async () => {
      await this.firstNameInput.fill(user.personal.firstName);
      await this.lastNameInput.fill(user.personal.lastName);
      await this.phoneNumberInput.fill(user.personal.phoneNumber);
      await this.emailInput.fill(user.personal.email);
    });
  }

  async enterAddressData(user: User): Promise<void> {
    await test.step(`User enters address information ${JSON.stringify(user.address)}`, async () => {
      await this.addressInput.fill(user.address.address);
      await this.cityInput.fill(user.address.city);
      await this.stateInput.fill(user.address.state);
      await this.postalCodeInput.fill(user.address.postalCode);
    });
  }

  async clickNextStepButton(): Promise<void> {
    await test.step("User clicks on next step button", async () => {
      await expect(this.nextStepButton).toHaveCount(1);
      await this.nextStepButton.click();
    });
  }

  async selectShippingMethod(shippingMethod: ShippingMethod): Promise<void> {
    await test.step(`User selects ${shippingMethod} shipping method`, async () => {
      await this.shippingMethodOption(shippingMethod).click();
    });
  }

  async selectPaymentMethod(paymentMethod: PaymentMethod): Promise<void> {
    await test.step(`User selects ${paymentMethod} payment method`, async () => {
      await this.paymentMethodOption(paymentMethod).click();
    });
  }

  async clickCompleteOrderButton(): Promise<void> {
    await test.step("User clicks on complete order button", async () => {
      await this.completeOrderButton.click();
    });
  }
}
