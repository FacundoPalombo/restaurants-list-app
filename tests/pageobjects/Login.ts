import { TEST_BASE_URL } from "@/app/utils/constants";
import { Locator, Page, expect } from "@playwright/test";

type Account = {
  email: string;
  password: string;
};

export default class Signup {
  page: Page;
  footer: Locator;
  cta: Locator;
  emailField: Locator;
  passwordField: Locator;
  backSpaceSignupButton: Locator;
  backSignupButton: Locator;
  userMenu: Locator;
  logoutButton: Locator;
  account: Account;

  constructor(page: Page, account?: Account) {
    this.page = page;
    if (account) {
      this.account = account;
    } else {
      this.account = {
        email: "robot@micuentarobot.com",
        password: "R0b0c00p!",
      };
    }

    // bootstrap page asserts
    this.footer = page.locator("footer", {
      hasText: "Prueba técnica ©Tailor hub SL 2019 - 2024",
    });
    this.cta = page.getByRole("button", { name: "Entrar" });

    this.emailField = page.getByRole("textbox", { name: "Email:" });
    this.passwordField = page.locator("#password");

    this.backSpaceSignupButton = page.getByRole("button", {
      name: "Volver al inicio de sesión",
    });

    this.backSignupButton = page.getByRole("link", {
      name: "Regístrate",
    });

    this.userMenu = page.locator("#user-menu");

    this.logoutButton = page.getByRole("button", {
      name: "Cerrar Sesión",
    });
    // Button redirects asserts
  }

  async goto() {
    await this.page.goto("/login");
  }

  async getStarted() {
    await this.goto();
    await expect(this.footer).toBeVisible();
  }

  async doLogin() {
    await expect(this.emailField).toBeVisible();

    await this.emailField.fill(this.account.email);
    await this.emailField.press("Tab");
    await this.passwordField.focus();
    await this.passwordField.pressSequentially(this.account?.password);
    await this.passwordField.press("Enter");

    await this.page.waitForURL(TEST_BASE_URL + "/restaurants");
    // Then login into the account
    await expect(this.userMenu).toBeTruthy();
  }

  async goBackToSignup() {
    await expect(this.emailField).toBeVisible();
    await expect(this.backSignupButton).toHaveAttribute("href", "/signup");
  }

  async doLogout() {
    await this.doLogin();
    await this.page.waitForURL(TEST_BASE_URL + "/restaurants");

    // Asserts user menu functionality onClick
    await expect(this.userMenu).toBeTruthy();
    await expect(this.userMenu).not.toBeVisible();
    await this.userMenu.click();
    await expect(this.userMenu).toBeVisible();

    // Assert
    await expect(this.logoutButton).toBeVisible();
    await this.logoutButton.click();
    await this.page.waitForURL(TEST_BASE_URL + "/login");

    // random assert of the view in the login page
    await expect(this.backSignupButton).toBeInViewport();
  }
}
