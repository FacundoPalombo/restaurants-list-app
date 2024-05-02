import { API_BASE_URL } from "@/app/utils/constants";
import { createSession } from "../lib/session";
import { cookies } from "next/headers";

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
    console.error(error);
    return { error };
  }
}

export async function doLogin(formData: FormData) {
  {
    // Prepare request headers
    const headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Prepare body data payload
    const urlEncodedData = new URLSearchParams();
    urlEncodedData.append("email", email);
    urlEncodedData.append("password", password);

    const request = new Request(new URL("/api/auth/login", API_BASE_URL), {
      method: "POST",
      cache: "no-cache",
      mode: "cors",
      headers,
      body: urlEncodedData,
    });

    try {
      const response = await fetch(request);
      console.log(response);
      if (!response.ok) {
        const error = await response.json();

        console.error(error);
        throw new Error(error?.message);
      }

      // Obtain Authorization bearer token, userId, refreshToken and expires at to make the session and insert into cookies.
      const token = response.headers?.get("Authorization") as string;
      const { _id: userId }: { _id: string } = await response.json();
      const refreshToken = cookies().get("refreshToken")?.value as string;
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

      await createSession({ token, userId, refreshToken, expiresAt });

      return Response.json({ message: "Inición seseada" });
    } catch (error) {
      console.error(error);
      return { error };
    }
  }
}
