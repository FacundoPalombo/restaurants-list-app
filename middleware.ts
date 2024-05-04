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
  // CSP SETTINGS
  // create nonce for xss protection
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  // Declare CSP policies and Set csp policies on allowed origin sources
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic'  ${
    process.env.NODE_ENV === "development" && "'unsafe-eval'"
  };
    style-src 'self' 'unsafe-inline'; 
    img-src 'self' https://*.tile.openstreetmap.org/ https://res.cloudinary.com/tailor-hub/ blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
`;
  // Replace newline characters and spaces
  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, " ")
    .trim();

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);

  requestHeaders.set(
    "Content-Security-Policy",
    contentSecurityPolicyHeaderValue
  );

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  response.headers.set(
    "Content-Security-Policy",
    contentSecurityPolicyHeaderValue
  );

  // CORS SETTINGS
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
  if (isAllowedOrigin) {
    response.headers.set("Access-Control-Allow-Origin", origin);
  }

  // SESSION HANDLING
  const sessionCookie = request.cookies.get("session");

  // If no session cookie exists, then should signup
  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/signup", request.url));
  }

  // The user session is verified.
  const verifiedSession = await verifySession();

  // if session request code is not 200 ok, then should redirect to login, whatever it was.
  if (!verifiedSession?.ok) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return response;
}

// This validation occurs in all paths on the app, except the listed ones.
export const config = {
  matcher: "/((?!login|signup|api|_next/static|_next/image|favicon.ico).+)",
};
