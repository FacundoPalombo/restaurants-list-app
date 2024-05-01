import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { BASE_URL } from "./app/utils/constants";

export async function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get("session");

  // If no session cookie exists, then should signin
  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  const prepareRequest = new Request(new URL("/auth/verify", BASE_URL), {
    method: "GET",
    cache: "no-cache",
    headers: {
      Authorization: sessionCookie.value.toString(),
    },
  });

  // Verify if the session is currently valid, otherwise should login again
  const validateSession = await fetch(prepareRequest)
    .then((res) => res.json())
    .catch((err) => NextResponse.redirect(new URL("/login", request.url)));

  // if session request code is not 200 ok, then should redirect to login, whatever it was.
  if (!validateSession.ok) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// This validation occurs in all paths on the app, except the listed ones.
export const config = {
  matcher: "/((?!login|signin|api|_next/static|_next/image|favicon.ico).+)",
};
