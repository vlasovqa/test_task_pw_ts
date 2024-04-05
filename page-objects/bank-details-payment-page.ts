import { Locator, Page, test, FrameLocator, expect } from "@playwright/test";
import { User } from "../interfaces/user";

export class BankDetailsPage {
  readonly page: Page;
  private readonly paymentForm: FrameLocator;
  private readonly signInButton: Locator;
  private readonly checkoutViaNedbankButton: Locator;
  private readonly checkoutLoader: Locator;
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly approveTransactionButton: Locator;
  private readonly paymentStatus: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutViaNedbankButton = page.frameLocator("iframe").locator('[data-testid="checkout-nedbank-button"]');
    this.checkoutLoader = page.frameLocator("iframe").locator("[data-testid='checkout-loader']");
    this.paymentForm = page.frameLocator("iframe").frameLocator('[data-testid="checkout-iframe"]');
    this.usernameInput = this.paymentForm.locator('[name="username"]');
    this.passwordInput = this.paymentForm.locator('[name="password"]');
    this.approveTransactionButton = this.paymentForm.locator(".paid-response");
    this.signInButton = this.paymentForm.locator(".submitBtn");
    this.paymentStatus = this.paymentForm.locator("#eftx-title");
  }

  async selectNedbankProvider(): Promise<void> {
    await test.step("User selects nedbank", async () => {
      await this.checkoutViaNedbankButton.click();
      await expect(this.checkoutLoader).toBeVisible();
      await expect(this.checkoutLoader).toBeHidden();
    });
  }

  async enterBankDetails(user: User): Promise<void> {
    await test.step(`User enters bank details ${user.bankDetails}`, async () => {
      await this.usernameInput.fill(user.bankDetails.username);
      await this.passwordInput.type(user.bankDetails.password, { delay: 100 });
    });
  }

  async clickSignInButton(): Promise<void> {
    await test.step("User clicks on pay button", async () => {
      await this.signInButton.click();
      await expect(this.checkoutLoader).toBeVisible();
      await expect(this.checkoutLoader).toBeHidden();
    });
  }

  async approveTransaction(): Promise<void> {
    await test.step("User approves the transaction", async () => {
      await this.approveTransactionButton.click();
    });
  }

  async verifyPaymentMessage(message: string): Promise<void> {
    await test.step(`Verify ${message} is displayed after approving payment`, async () => {
      await expect(this.paymentStatus).toHaveText(message);
    });
  }
}
