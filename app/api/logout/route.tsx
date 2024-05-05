import { logout } from "@/app/services/auth";
import { HttpError } from "http-errors";

export async function GET() {
  try {
    const response = await logout();
    console.log(response);
    if (response.ok) return Response.json({ payload: response.payload });
    if (response instanceof HttpError) {
      return Response.error();
    }
  } catch (error) {
    return Response.json({ error });
  }
}
