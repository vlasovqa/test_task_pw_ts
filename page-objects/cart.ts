import { Locator, Page, test, expect } from "@playwright/test";

export class Cart {
  private readonly page: Page;
  private readonly productName: Locator;
  private readonly productPrice: Locator;
  private readonly checkoutButton: Locator;
  private readonly removeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productName = page.locator(".py-6 h3");
    this.productPrice = page.locator(".py-6 .text-base p");
    this.checkoutButton = page.locator('a[href="/checkout"]');
    this.removeButton = page.locator("button.font-medium");
  }

  async verifyProductInCart(productName: string, productPrice: string): Promise<void> {
    await test.step(`Verify product ${productName} is displayed in cart with ${productPrice} price `, async () => {
      await expect(this.productName).toHaveText(productName);
      await expect(this.productPrice).toHaveText(productPrice);
    });
  }

  async clickCheckoutButton(): Promise<void> {
    await test.step("User clicks on checkout button", async () => {
      await this.checkoutButton.click();
    });
  }

  async clearCart(): Promise<void> {
    await test.step("User removes all items from the cart", async () => {
      const removeButtons = await this.removeButton.all();
      if (removeButtons.length === 0) {
        return;
      }
      await removeButtons[0].click();
      await this.clearCart();
    });
  }
}
