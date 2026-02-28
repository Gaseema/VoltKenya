import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySession } from "./lib/auth"; // Need to use standard non-alias path in root middleware sometimes depending on tsconfig

// Helper: check if route starts with given path
const checkIsProtected = (pathname: string, pathPrefix: string) => {
  return pathname === pathPrefix || pathname.startsWith(`${pathPrefix}/`);
};

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Example: Protect all /admin routes
  const isAdminRoute = checkIsProtected(pathname, "/admin");

  if (isAdminRoute) {
    // We cannot use node crypto inside edge runtime easily unless jose is edge compat (which it is)
    // For Next.js App router middleware:
    const sessionCookie = request.cookies.get("session")?.value;

    if (!sessionCookie) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    try {
      // Decode jose JWT token directly
      const { jwtVerify } = await import("jose");
      const secret = new TextEncoder().encode(
        process.env.JWT_SECRET || "super-secret-key-for-dev",
      );
      const { payload } = await jwtVerify(sessionCookie, secret);

      if (payload.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/", request.url)); // Or to a 403 page
      }
    } catch (err) {
      // Invalid token
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Allow through if valid or not protected
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
