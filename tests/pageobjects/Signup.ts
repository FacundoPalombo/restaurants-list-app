import { Locator, Page, expect } from "@playwright/test";

type Account = {
  name: string;
  email: string;
  password: string;
};
export default class Signup {
  page: Page;
  footer: Locator;
  account: Account;

  cta: Locator;
  ctaNext: Locator;
  emailField: Locator;
  userField: Locator;
  passwordField: Locator;
  backLoginButton: Locator;
  backSpaceButton: Locator;
  loginLabel: Locator;

  constructor(page: Page, account: Account) {
    this.page = page;

    if (account) {
      this.account = account;
    } else {
      this.account = {
        name: "MrRobotitus",
        email: "robot@cuenta-robot.com",
        password: "R0b0c0p.",
      };
    }

    // bootstrap page asserts
    this.footer = page.locator("footer", {
      hasText: "Prueba técnica ©Tailor hub SL 2019 - 2024",
    });
    this.ctaNext = page.getByRole("button", { name: "Siguiente " });
    this.cta = page.getByRole("button", { name: "Finalizar " });

    this.emailField = page.getByRole("textbox", { name: "Añade tu email" });
    this.userField = page.getByRole("textbox", {
      name: "Añade tu nombre de usuario",
    });
    this.passwordField = page.getByRole("textbox", {
      name: "Crea tu contraseña",
    });
    // Button redirects asserts
    this.backLoginButton = page.getByRole("button", {
      name: "Volver al inicio de sesión",
    });
    this.backSpaceButton = page.getByRole("button", {
      name: "Volver a editar email o nombre de usuario",
    });
    this.loginLabel = page.getByText("¿No tienes cuenta? Regístrate");
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
    await this.emailField.fill(this.account.email);
    await this.userField.fill(this.account.name);
    await this.ctaNext.click();
    await expect(this.passwordField).toBeVisible();
    await this.passwordField.fill(this.account.password);
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

  async doReturnLogin() {
    await expect(this.emailField).toBeVisible();
    await expect(this.backSpaceButton).not.toBeInViewport();
    await expect(this.backLoginButton).toBeInViewport();
    await this.backLoginButton.click();
    await expect(this.loginLabel).toBeVisible();
  }
}
