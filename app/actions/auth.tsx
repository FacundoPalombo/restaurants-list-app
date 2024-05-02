"use server";
import { revalidatePath } from "next/cache";
import { SignupSchema, FormState } from "../lib/definitions";
import { createAccount } from "../services/auth";

export async function signup(state: FormState, formData: FormData) {
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
      if (response?.ok) revalidatePath("/");
      if (!response?.ok)
        return { error: "Unexpected Error", payload: response };
    }
  } catch (error) {
    console.error(error);
    return { error };
  }
}

export async function login(state: FormState, formData: FormData) {}
