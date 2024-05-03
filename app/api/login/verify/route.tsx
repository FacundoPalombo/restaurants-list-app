import { verifySession } from "@/app/services/auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { ok, payload } = await verifySession();
    if (ok) return NextResponse.json(payload);
  } catch (error) {
    return { error };
  }
}
