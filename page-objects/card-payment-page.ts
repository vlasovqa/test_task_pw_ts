import { Locator, Page, test, FrameLocator } from "@playwright/test";
import { User } from "../interfaces/user";

export class CardPaymentPage {
  readonly page: Page;
  private readonly paymentForm: FrameLocator;
  private readonly cardHolderInput: Locator;
  private readonly cardNumberInput: Locator;
  private readonly monthExpirationDateInput: Locator;
  private readonly yearExpirationDateInput: Locator;
  private readonly cvvInput: Locator;
  private readonly payButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.paymentForm = page.frameLocator("#vault-card-form");
    this.cardHolderInput = this.paymentForm.locator("#card_holder_name");
    this.cardNumberInput = this.paymentForm.locator("#card_number");
    this.monthExpirationDateInput = this.paymentForm.locator("#expiry_month");
    this.yearExpirationDateInput = this.paymentForm.locator("#expiry_year");
    this.cvvInput = this.paymentForm.locator("#cvv");
    this.payButton = page.locator("button[type='submit']");
  }

  async enterCardData(user: User): Promise<void> {
    await test.step(`User enters card data ${JSON.stringify(user.cardDetails)}`, async () => {
      await this.cardHolderInput.fill(user.cardDetails.cardHolder);
      await this.cardNumberInput.fill(user.cardDetails.cardNumber);
      await this.monthExpirationDateInput.fill(user.cardDetails.monthExpirationDate);
      await this.yearExpirationDateInput.fill(user.cardDetails.yearExpirationDate);
      await this.cvvInput.fill(user.cardDetails.cvv);
    });
  }

  async clickPayButton(): Promise<void> {
    await test.step("User clicks on pay button", async () => {
      await this.payButton.click();
    });
  }
}
