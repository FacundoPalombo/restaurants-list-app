import { Locator, Page, expect } from "@playwright/test";

export default class Home {
  page: Page;
  footer: Locator;
  welcomeText: Locator;
  cta: Locator;

  signupText: Locator;

  constructor(page: Page) {
    this.page = page;

    // bootstrap page asserts
    this.footer = page.locator("footer", {
      hasText: "Prueba técnica ©Tailor hub SL 2019 - 2024",
    });
    this.welcomeText = page.getByText("Hola, ");
    this.cta = page.getByRole("button", {
      name: "Entra a ver los restaurantes",
    });

    // Button redirects asserts
    this.signupText = page.getByRole("button", {
      name: "Volver al inicio de sesión",
    });
  }

  async goto() {
    await this.page.goto("/");
  }

  async getStarted() {
    await this.goto();
    await expect(this.footer).toBeVisible();
    await expect(this.welcomeText).toBeVisible();
    await expect(this.cta).toBeVisible();
  }

  async buttonRedirects() {
    await this.getStarted();
    await this.cta.click();
    await expect(this.signupText).toBeVisible();
  }
}
