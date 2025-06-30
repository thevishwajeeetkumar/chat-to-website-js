import { NextResponse } from "next/server";

export async function POST() {
  const response = new NextResponse(null, { status: 302 });
  response.cookies.set("accessToken", "", { maxAge: 0, path: "/" });
  response.cookies.set("refreshToken", "", { maxAge: 0, path: "/" });
  response.headers.set("Location", "/auth/login");
  return response;
}
