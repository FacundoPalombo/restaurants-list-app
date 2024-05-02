import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { SessionPayload } from "@/app/lib/definitions";
import { API_BASE_URL } from "../utils/constants";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Failed to verify session");
  }
}

export async function createSession({
  token,
  userId,
  refreshToken,
  expiresAt,
}: SessionPayload) {
  // Go create session token

  // Encrypt session token obtained
  const session = await encrypt({ token, expiresAt, userId, refreshToken });

  cookies().set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function updateSession() {
  const session = cookies().get("session")?.value;
  const payload = await decrypt(session);

  if (!session || !payload) {
    return null;
  }
  const request = new Request(new URL("/auth/refresh-token", API_BASE_URL), {
    method: "GET",
    cache: "no-cache",
    headers: {
      Authorization: session.toString(),
    },
  });

  try {
    // Go refresh session with refresh token
    const response = await fetch(request);
    const newSession = response.headers?.get("Authorization") as string;

    // finally set new session cookie
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    cookies().set("session", newSession, {
      httpOnly: true,
      secure: true,
      expires: expires,
      sameSite: "lax",
      path: "/",
    });
  } catch (error) {
    console.error(error);
    return { error };
  }
}

export async function validateSession() {
  const session = cookies().get("session")?.value as string;

  const request = new Request(new URL("/auth/verify", API_BASE_URL), {
    method: "GET",
    cache: "no-cache",
    headers: {
      Authorization: session.toString(),
    },
  });

  try {
    // Verify if the session is currently valid, otherwise should return error and handle it on middlewares
    const response = await fetch(request);

    if (!response?.ok) return { error: "Error trying to validate session" };

    return { ok: true };
  } catch (error) {
    console.error(error);
    return { error };
  }
}
