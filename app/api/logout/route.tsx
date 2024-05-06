import { logout } from "@/app/services/auth";
import { HttpError } from "http-errors";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await logout();

    if (response?.ok) {
      console.log({ message: response?.message });
      return NextResponse.redirect("/login");
    }
    if (!response?.ok) {
      console.log({ error: response?.error });
      return NextResponse.error();
    }
  } catch (error) {
    return NextResponse.error();
  }
}
