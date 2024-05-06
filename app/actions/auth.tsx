"use server";
import { revalidatePath } from "next/cache";
import {
  SignupSchema,
  SignupFormState,
  LoginSchema,
  LoginFormState,
  LogoutFormState,
} from "../lib/definitions";
import {
  createAccount,
  doLogin,
  logout as logoutService,
} from "../services/auth";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function signup(state: SignupFormState, formData: FormData) {
  // Validate form fields
  const validatedFields = SignupSchema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const response = await createAccount(formData);
    if (response instanceof Response) {
      if (response?.ok) {
        revalidatePath("/");
      }
      if (!response?.ok)
        return { error: "Unexpected Error", payload: response };
    }
  } catch (error) {
    console.error(error);
    return { error };
  }
  redirect("/login");
}

export async function login(state: LoginFormState, formData: FormData) {
  // Validate form fields
  const validatedFields = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const response = await doLogin(formData);
    if (response instanceof Response) {
      if (response?.ok) {
        revalidatePath("/");
      }
      if (!response?.ok)
        return { error: "Unexpected Error", payload: response };
    }
  } catch (error) {
    console.error(error);
    return { error };
  }

  redirect("/restaurants");
}

export async function logout(state: LogoutFormState, formData: FormData) {
  try {
    const response = await logoutService();

    if (response?.ok) {
      revalidatePath("/restaurants");
      return NextResponse.redirect("/login");
    }
    if (!response?.ok) {
      return { error: "Error al cerrar la sesión", payload: response };
    }
  } catch (error) {
    console.error(error);
    return { error };
  }

  redirect("/restaurants");
}
