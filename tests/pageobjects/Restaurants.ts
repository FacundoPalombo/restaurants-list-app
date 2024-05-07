import { Locator, Page, expect } from "@playwright/test";

export default class Restaurants {
  page: Page;
  footer: Locator;
  userMenu: Locator;
  logout: Locator;

  constructor(page: Page) {
    this.page = page;

    // bootstrap page asserts
    this.footer = page.locator("footer", {
      hasText: "Prueba técnica ©Tailor hub SL 2019 - 2024",
    });
    this.userMenu = page.locator("#user-menu");
    this.logout = page.getByRole("button", { name: "Cerrar sesión" });
  }

  async goto() {
    await this.page.goto("/restaurants");
  }

  async getStarted() {
    await this.goto();
    // first assertion
  }
}
