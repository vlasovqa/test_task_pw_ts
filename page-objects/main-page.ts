import { Locator, Page, test } from "@playwright/test";
import { Header } from "./header";

export class MainPage {
  readonly page: Page;
  readonly header: Header;
  private readonly productsList: Locator;
  private readonly addToCartButton: Locator;
  private readonly productName: string = "h3";
  private readonly productPrice: string = ".font-medium";

  constructor(page: Page) {
    this.page = page;
    this.productsList = page.locator(".grid button");
    this.addToCartButton = page.locator('[type="submit"]');
    this.header = new Header(page);
  }

  async addRandomItemToCart(): Promise<{ productName: string; productPrice: string }> {
    return await test.step("User adds random item to cart", async () => {
      const productsList = await this.productsList.all();
      const productCard = productsList[Math.floor(Math.random() * productsList.length)];
      const productName = await productCard.locator(this.productName).innerText();
      const productPrice = await productCard.locator(this.productPrice).innerText();
      await productCard.click();
      await this.addToCartButton.click();
      return { productName, productPrice };
    });
  }

  async goto(): Promise<void> {
    await test.step("User opens main page", async () => {
      await this.page.goto("/");
    });
  }
}
