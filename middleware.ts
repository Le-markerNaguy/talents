import { NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin") && !request.nextUrl.pathname.startsWith("/admin/login")
  const hasSession = request.cookies.get("admin_session")?.value === "true"

  if (isAdminRoute && !hasSession) {
    return NextResponse.redirect(new URL("/admin/login", request.url))
  }
  if (request.nextUrl.pathname === "/admin/login" && hasSession) {
    return NextResponse.redirect(new URL("/admin", request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/admin", "/admin/login"]
}
