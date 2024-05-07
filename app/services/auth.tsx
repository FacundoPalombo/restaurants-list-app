import { API_BASE_URL } from "@/app/utils/constants";
import { cookies } from "next/headers";

//TODO: Al facundo del futuro implementar JWT con jose

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
      return { error };
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

      if (!response.ok) {
        const error = await response.json();

        console.error(error);
        throw new Error(error?.message);
      }

      // Obtain Authorization bearer token, userId, refreshToken and expires at to make the session and insert into cookies.
      const token = response.headers?.get("Authorization") as string;
      const {
        _id: userId,
        email,
        name: username,
      }: { _id: string; email: string; name: string } = await response.json();

      const refreshToken = response.headers
        .getSetCookie()
        .filter((cookie) => cookie.includes("refreshToken"))[0]
        .match(/refreshToken\=([a-zA-Z0-9\.]+)/);

      if (!refreshToken) return { error: "No refresh token provided" };

      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

      cookies().set({
        name: "session",
        value: token,
        expires: expiresAt,
        httpOnly: true,
        secure: true,
      });

      cookies().set({
        name: "refreshToken",
        value: refreshToken[0]?.replace("refreshToken=", ""),
        expires: expiresAt,
        httpOnly: true,
        secure: true,
      });

      const payload = { userId, email, username };

      return Response.json({ message: "Inición seseada", data: payload });
    } catch (error) {
      console.error(error);
      return { error };
    }
  }
}

export async function verifySession() {
  const session = cookies().get("session")?.value as string;

  const request = new Request(new URL("/api/auth/verify", API_BASE_URL), {
    method: "GET",
    headers: {
      Authorization: session.toString(),
    },
  });

  try {
    // Verify if the session is currently valid, otherwise should return error and handle it on middlewares
    const response = await fetch(request);

    if (!response?.ok) return { error: "Error trying to validate session" };
    if (response.ok) {
      const payload = await response.json();
      return { ok: true, payload };
    }
  } catch (error) {
    console.error(error);
    return { error };
  }
}

export async function logout() {
  const session = cookies().get("session")?.value as string;
  const refreshToken = cookies().get("refreshToken")?.value as string;

  const request = new Request(new URL("/api/auth/logout", API_BASE_URL), {
    method: "GET",
    headers: {
      Authorization: session?.toString(),
      Cookie: `refreshToken=${refreshToken}`,
    },
  });

  try {
    // Verify if the session is currently valid, otherwise should return error and handle it on middlewares
    const response = await fetch(request);

    if (response.ok) {
      const message = await response.text();
      return { message };
    }
    if (!response?.ok) {
      const error = await response.json();
      return { error };
    }
  } catch (error) {
    console.error(error);
    return { error };
  }
}
