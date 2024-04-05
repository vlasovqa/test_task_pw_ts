import { Locator, Page, test, FrameLocator, expect } from "@playwright/test";
import { User } from "../interfaces/user";

export class PayflexPage {
  readonly page: Page;
  private readonly paymentForm: FrameLocator;
  private readonly emailInput: Locator;
  private readonly termsAndConditionsRadioButton: Locator;
  private readonly payButton: Locator;
  private readonly payNowButton: Locator;
  private readonly cardHolderInput: Locator;
  private readonly cardNumberInput: Locator;
  private readonly expirationDateInput: Locator;
  private readonly cvvInput: Locator;
  private readonly confirmPaymentButton: Locator;
  private readonly returnToMerchantButton: Locator;
  private readonly paymentMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.paymentForm = page
      .frameLocator("iframe")
      .frameLocator('[data-testid="checkout-iframe"]')
      .frameLocator('iframe[name="myCustomIframe"]');
    this.emailInput = this.paymentForm.locator('[name="customerEmail"]');
    this.termsAndConditionsRadioButton = this.paymentForm.locator(".switch");
    this.payButton = this.paymentForm.locator(".sky-button");
    this.payNowButton = this.paymentForm.locator(".pay-check-box").last();
    this.cardNumberInput = this.paymentForm.frameLocator('[name="card.number"]').locator("input[type='tel']");
    this.expirationDateInput = this.paymentForm.locator('[aria-label="Expiry date"]');
    this.cardHolderInput = this.paymentForm.locator('[aria-label="Name on card"]');
    this.cvvInput = this.paymentForm.frameLocator('[name="card.cvv"]').locator("input");
    this.confirmPaymentButton = this.paymentForm.locator('[aria-label="Pay now"]');
    this.returnToMerchantButton = this.paymentForm.locator(".return-merchant");
    this.paymentMessage = this.paymentForm.locator("h1");
  }

  async switchPaymentTypeToNow(): Promise<void> {
    await test.step("User selects Pay now option", async () => {
      await this.payNowButton.click({ timeout: 60000 }); // Added timeout because widget loads slowly
    });
  }

  async enterEmail(email: string): Promise<void> {
    await test.step(`User enters email ${email}`, async () => {
      await this.emailInput.type(email, { delay: 50 });
    });
  }

  async acceptTermsAndConditions(): Promise<void> {
    await test.step("Users accepts terms and conditions", async () => {
      await this.termsAndConditionsRadioButton.click();
    });
  }

  async proceedToCardPayment(): Promise<void> {
    await test.step("User clicks on pay button and proceedes to card payment page", async () => {
      await this.payButton.click();
    });
  }

  async enterCardData(user: User): Promise<void> {
    await test.step(`User enters card data ${JSON.stringify(user.cardDetails)}`, async () => {
      await this.cardNumberInput.fill(user.cardDetails.cardNumber, { timeout: 60000 }); // Added timeout because widget loads slowly
      await this.cardHolderInput.fill(user.cardDetails.cardHolder);
      await this.cvvInput.fill(user.cardDetails.cvv);
      await this.expirationDateInput.fill(
        `${user.cardDetails.monthExpirationDate}${user.cardDetails.yearExpirationDate}`,
      );
    });
  }

  async confirmPayment(): Promise<void> {
    await test.step("User confirms payment", async () => {
      await this.confirmPaymentButton.click();
    });
  }

  async clickReturnToMerchantButton(): Promise<void> {
    await test.step("User redirects back to website", async () => {
      await this.returnToMerchantButton.click();
    });
  }

  async verifyPaymentMessage(message: string): Promise<void> {
    await test.step(`Verify ${message} message is displayed`, async () => {
      await expect(this.paymentMessage).toHaveText(message);
    });
  }
}
