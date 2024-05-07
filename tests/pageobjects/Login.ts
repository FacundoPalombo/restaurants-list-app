import { Locator, Page, expect } from "@playwright/test";

export default class Signup {
  page: Page;
  footer: Locator;
  cta: Locator;
  ctaNext: Locator;
  emailField: Locator;
  passwordField: Locator;
  backSpaceSignupButton: Locator;
  backSignupButton: Locator;
  userMenu: Locator;
  logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // bootstrap page asserts
    this.footer = page.locator("footer", {
      hasText: "Prueba técnica ©Tailor hub SL 2019 - 2024",
    });
    this.ctaNext = page.getByRole("button", { name: "Siguiente " });
    this.cta = page.getByRole("button", { name: "Finalizar " });

    this.emailField = page.getByRole("textbox", { name: "Email:" });
    this.passwordField = page.getByRole("textbox", {
      name: "Contraseña: Escribe tu password",
    });

    this.backSpaceSignupButton = page.getByRole("button", {
      name: "Volver al inicio de sesión",
    });

    this.backSignupButton = page.getByRole("link", {
      name: "Registrate",
    });

    this.userMenu = page.getByRole("button", {
      name: "Cuenta robot",
    });
    this.logoutButton = page.getByRole("button", {
      name: "Cerrar Sesión",
    });
    // Button redirects asserts
  }

  async goto() {
    await this.page.goto("/signup");
  }

  async getStarted() {
    await this.goto();
    await expect(this.footer).toBeVisible();
  }

  async doLogin() {
    await expect(this.emailField).toBeVisible();
    // change this values from a csv to make infinite accounts.
    await this.emailField.fill("robot@micuentarobot.com");
    await this.passwordField.fill("R0b0c00p1!");
    // then create a account...
    await this.cta.click();
    await expect(this.userMenu).toBeVisible();
  }

  async goBackToSignup() {
    await expect(this.emailField).toBeVisible();
    await this.backSignupButton.click();
    await expect(this.backSpaceSignupButton).toBeVisible();
    await this.backSpaceSignupButton.click();
    await expect(this.backSignupButton).toBeVisible();
  }

  async doLogout() {
    await this.doLogin();
    await expect(this.page.url()).toContain("/restaurants");
    await expect(this.userMenu).toBeVisible();
    await this.userMenu.click();
    await expect(this.logoutButton).toBeInViewport();
    await this.logoutButton.click();
    await expect(this.page.url()).toContain("/login");
    await expect(this.backSignupButton).toBeInViewport();
  }
}
