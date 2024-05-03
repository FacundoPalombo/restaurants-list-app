import { logout } from "@/app/services/auth";

export async function GET() {
  try {
    const response = await logout();
    if (response.ok) return Response.json({ payload: response.payload });
    if (!response.ok) throw new Error("Error procesando el logout");
  } catch (error) {
    return Response.json({ error });
  }
}
