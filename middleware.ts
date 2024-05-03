import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { API_BASE_URL } from "./app/utils/constants";
import { verifySession } from "./app/services/auth";

const allowedOrigins = [API_BASE_URL];
const corsOptions = {
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function middleware(request: NextRequest) {
  // Check the origin from the request
  const origin = request.headers.get("origin") ?? "";
  const isAllowedOrigin = allowedOrigins.includes(origin);

  // Handle preflighted requests
  const isPreflight = request.method === "OPTIONS";

  if (isPreflight) {
    const preflightHeaders = {
      ...(isAllowedOrigin && { "Access-Control-Allow-Origin": origin }),
      ...corsOptions,
    };
    return NextResponse.json({}, { headers: preflightHeaders });
  }

  // Handle simple requests
  const response = NextResponse.next();

  if (isAllowedOrigin) {
    response.headers.set("Access-Control-Allow-Origin", origin);
  }

  const sessionCookie = request.cookies.get("session");

  // If no session cookie exists, then should signup
  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/signup", request.url));
  }

  const verifiedSession = await verifySession();

  // if session request code is not 200 ok, then should redirect to login, whatever it was.
  if (!verifiedSession?.ok) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// This validation occurs in all paths on the app, except the listed ones.
export const config = {
  matcher: "/((?!login|signup|api|_next/static|_next/image|favicon.ico).+)",
};
