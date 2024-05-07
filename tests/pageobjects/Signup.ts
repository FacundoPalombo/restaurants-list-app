import { Locator, Page, expect } from "@playwright/test";

export default class Signup {
  page: Page;
  footer: Locator;

  cta: Locator;
  ctaNext: Locator;
  emailField: Locator;
  userField: Locator;
  passwordField: Locator;
  backSpaceButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // bootstrap page asserts
    this.footer = page.locator("footer", {
      hasText: "Prueba técnica ©Tailor hub SL 2019 - 2024",
    });
    this.ctaNext = page.getByRole("button", { name: "Siguiente " });
    this.cta = page.getByRole("button", { name: "Finalizar " });

    this.emailField = page.getByRole("textbox", { name: "Email:" });
    this.userField = page.getByRole("textbox", { name: "Nombre de usuario:" });
    this.passwordField = page.getByRole("textbox", { name: "Contraseña:" });
    this.backSpaceButton = page.getByRole("button", {
      name: "Volver al inicio de sesión",
    });
    this.backSpaceButton = page.getByRole("button", {
      name: "Volver a editar email o nombre de usuario",
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

  async doSignup() {
    await expect(this.emailField).toBeVisible();
    // change this values from a csv to make infinite accounts.
    await this.emailField.fill("robot@cuenta-robot.com");
    await this.userField.fill("MrRobotitus");
    await this.ctaNext.click();
    await expect(this.passwordField).toBeVisible();
    await this.passwordField.fill("R0b0c00p!");
    // test if backwards works well
    await this.backSpaceButton.click();
    await expect(this.emailField).toBeVisible();
    await expect(this.ctaNext).toBeVisible();
    await this.ctaNext.click();
    await expect(this.cta).toBeVisible();
    // then create a account...
    // await this.cta.click()
    // await expect(this.welcomeLogin).toBeVisible()
  }
}
