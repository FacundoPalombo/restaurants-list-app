import { revalidatePath } from "next/cache";
import { SignupSchema, FormState } from "../lib/definitions";
import { createAccount } from "@/app/services/auth";

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
    const response = await createAccount({ formData });
    if (response.ok) revalidatePath("/");
    if (!response.ok) throw new Error("failed");
  } catch (error) {
    return { message: "Failed creating the user" };
  }
}

export async function login(state: FormState, formData: FormData) {}
