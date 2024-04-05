import { Locator, Page, test, expect } from "@playwright/test";
import { User } from "../interfaces/user";

export class OrderPage {
  readonly page: Page;
  private readonly orderCreatedMessage: Locator;
  private readonly productCard: Locator;
  private readonly userDetails: Locator;

  constructor(page: Page) {
    this.page = page;
    this.orderCreatedMessage = page.locator(".tracking-tight");
    this.productCard = page.locator(".flex-col");
    this.userDetails = page.locator(".block");
  }

  async verifyOrderCreatedMessage(message: string): Promise<void> {
    await test.step("User should be redirected to order created page", async () => {
      await expect(this.orderCreatedMessage).toHaveText(message, { timeout: 60000 });
    });
  }

  async verifyProductDetails(productName: string, productPrice: string): Promise<void> {
    await test.step(`Verify ${productName} is displayed with price ${productPrice}`, async () => {
      await expect(this.productCard).toContainText(productName);
      await expect(this.productCard).toContainText(productPrice);
    });
  }

  async verifyUserDetails(user: User): Promise<void> {
    await test.step(`Verify user details once order is created`, async () => {
      await expect(this.userDetails.filter({ hasText: user.address.address })).toBeVisible();
      await expect(this.userDetails.filter({ hasText: `${user.address.city}, ${user.address.state}` })).toBeVisible();
      await expect(
        this.userDetails.filter({ hasText: `${user.personal.firstName} ${user.personal.lastName}` }),
      ).toBeVisible();
      await expect(this.userDetails.filter({ hasText: user.personal.email })).toBeVisible();
      await expect(this.userDetails.filter({ hasText: user.personal.phoneNumber })).toBeVisible();
    });
  }
}
