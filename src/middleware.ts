import { NextResponse, NextRequest } from "next/server";

// Helper function to check role-based access
const checkRoleAccess = (
  tokenCookie: string | undefined,
  requiredRole: string
) => {
  if (!tokenCookie) return false;

  try {
    const parsedCookie = JSON.parse(decodeURIComponent(tokenCookie));
    const userRole = parsedCookie?.state?.authentication?.role; // Extract role from cookie
    return userRole === requiredRole;
  } catch (error) {
    console.error("Error parsing token cookie:", error);
    return false;
  }
};

export async function middleware(req: NextRequest) {
  console.log("Middleware triggered"); // <== DEBUG

  const tokenCookie = req.cookies.get("job.recruit")?.value;
  const currentPath = req.nextUrl.pathname;

  // Define the routes and corresponding roles that need to be protected
  const protectedRoutes = [
    { route: "/jobseeker", requiredRole: "JOBSEEKER" },
    { route: "/employer", requiredRole: "EMPLOYER" },
    { route: "/admin", requiredRole: "ADMIN" },
  ];

  // Check if the current path requires protection
  for (const { route, requiredRole } of protectedRoutes) {
    if (currentPath.startsWith(route)) {
      // Check role-based access for the current route
      if (!checkRoleAccess(tokenCookie, requiredRole)) {
        const loginUrl = new URL("/anonymous/signup", req.url);
        return NextResponse.redirect(loginUrl);
      }
    }
  }

  // Allow the request to continue if no issues with role or token
  return NextResponse.next();
}

export const config = {
  matcher: ["/employer/:path*", "/jobseeker/:path*", "/admin/:path*"],
};
