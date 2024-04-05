import { Locator, Page, test, expect } from "@playwright/test";
import { Cart } from "./cart";

export class Header {
  private readonly page: Page;
  private readonly cartButton: Locator;
  private readonly cartItemsCount: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartButton = page.locator("button.group");
    this.cartItemsCount = page.locator(".tabular-nums");
  }

  async openCart(): Promise<Cart> {
    return await test.step("User opens cart", async () => {
      await this.cartButton.click();
      return new Cart(this.page);
    });
  }

  async verifyCartItemsCount(count: number): Promise<void> {
    await test.step(`User should see ${count} items in the cart`, async () => {
      await expect(this.cartItemsCount).toHaveText(String(count));
    });
  }
}
