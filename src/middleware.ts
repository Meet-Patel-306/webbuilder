import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/site",
  "/agency/sign-in(.*)",
  "/agency/sign-up(.*)",
]);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const { userId } = await auth();
  const url = req.nextUrl;
  const pathname = url.pathname;
  const searchParams = url.searchParams;
  const headers = req.headers;
  const pathWithSearchParams = `${pathname}?${
    searchParams ? `${searchParams}` : ""
  }`;
  //  if subdomain exists
  // ex:- www.project.exmple.com/xyz-path?searchParams
  // sundomain:- project
  const subdomain = headers
    .get("host")
    ?.split(`${process.env.NEXT_PUBLIC_DOMAIN}`)
    .filter(Boolean)[0];
  if (subdomain) {
    // www.example/[subdomain]/xyz-path?searchParams
    return NextResponse.rewrite(
      new URL(`/${subdomain}${pathWithSearchParams}`, req.url)
    );
  }
  if (pathname === "/sing-in" && !userId) {
    return NextResponse.redirect(new URL("/agency/sign-in", req.url));
  }
  if (pathname === "/sing-up" && !userId) {
    return NextResponse.redirect(new URL("/agency/sign-up"));
  }
  if (
    pathname === "/" ||
    (pathname === "/site" && url.host === process.env.NEXT_PUBLIC_DOMAIN)
  ) {
    return NextResponse.rewrite(new URL("/site", req.url));
  }
  if (
    pathname.startsWith("/agency") ||
    (pathname.startsWith("/subaccount") && userId)
  ) {
    return NextResponse.rewrite(new URL(`${pathWithSearchParams}`, req.url));
  }
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
