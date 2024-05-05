import { API_BASE_URL } from "../utils/constants";

export async function getRestaurants({ page }: { page: string }) {
  const params = new URLSearchParams();
  params.set("limit", "10");
  params.set("page", page);

  const request = new Request(new URL("/api/restaurant/list", API_BASE_URL), {
    method: "GET",
  });

  try {
    const response = await fetch(request);
    const payload = await response.json();

    if (!response?.ok) return { error: "Error trying to get restaurants" };

    return { ok: true, payload };
  } catch (error) {
    console.error(error);
    return { error };
  }
}
