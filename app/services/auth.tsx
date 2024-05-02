import { API_BASE_URL } from "@/app/utils/constants";

import createError, { HttpError } from "http-errors";

export async function createAccount(formData: FormData) {
  // Prepare request headers
  const headers = new Headers();
  headers.append("Content-Type", "application/x-www-form-urlencoded");

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const username = formData.get("username") as string;

  // Prepare body data payload
  const urlEncodedData = new URLSearchParams();
  urlEncodedData.append("email", email);
  urlEncodedData.append("password", password);
  urlEncodedData.append("name", username);

  const request = new Request(new URL("/api/auth/signup", API_BASE_URL), {
    method: "POST",
    cache: "no-cache",
    mode: "cors",
    headers,
    body: urlEncodedData,
  });

  try {
    const response = await fetch(request);
    if (!response.ok) {
      const error = await response.json();

      console.error(error);
      throw new Error(error?.message);
    }

    return Response.json({ message: "Se creo la cuenta satisfactoriamente" });
  } catch (error) {
    if (error instanceof HttpError) return error;

    const errorMessage: string =
      (error as Error)?.message ?? "Error inesperado";
    console.error(error);
    return new Error(errorMessage);
  }
}
