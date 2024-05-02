import { API_BASE_URL } from "@/app/utils/constants";
import { Signup } from "@/app/lib/definitions";
import createError, { HttpError } from "http-errors";

export async function createAccount({ email, password, username }: Signup) {
  // Prepare request headers
  const headers = new Headers();
  headers.append("Content-Type", "application/x-www-form-urlencoded");

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
      const httpError = createError(error);

      console.error(httpError);
      throw httpError;
    }
    console.log("tremendo llega", response);
    return Response.json({ message: "Se creo la cuenta satisfactoriamente" });
  } catch (error) {
    if (error instanceof HttpError) return error;

    const errorMessage: string =
      (error as Error)?.message ?? "Error inesperado";
    console.error(error);
    return new Error(errorMessage);
  }
}
