import { createAccount } from "@/app/api/services/auth";
import { NextRequest, NextResponse } from "next/server";
import { HttpError } from "http-errors";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const params = {
    email: formData.get("email") as string,
    username: formData.get("username") as string,
    password: formData.get("password") as string,
  };

  try {
    const res = await createAccount(params);

    if (res instanceof HttpError) {
      return NextResponse.json({ errors: res.message }, { status: res.status });
    }

    return NextResponse.json({ message: "Account created", payload: res });
  } catch (error) {
    console.error(error);
    throw error;
  }
}
