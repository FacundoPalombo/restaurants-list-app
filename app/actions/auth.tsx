"use server";
import { revalidatePath } from "next/cache";
import {
  SignupSchema,
  SignupFormState,
  LoginSchema,
  LoginFormState,
} from "../lib/definitions";
import { createAccount, doLogin } from "../services/auth";
import { redirect } from "next/navigation";

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
