import "server-only";

import { API_BASE_URL } from "../utils/constants";

export async function getRestaurants({ page }: { page: string }) {
  const params = new URLSearchParams({ limit: "10", page });

  const request = new Request(
    new URL(
      `/api/restaurant/list${params && "?" + params.toString()}`,
      API_BASE_URL
    ),
    {
      method: "GET",
    }
  );

  try {
    const response = await fetch(request);
    const payload = await response.json();

    if (!response?.ok) {
      console.log(response);
      return { error: "Error trying to get restaurants" };
    }

    return payload;
  } catch (error) {
    console.error(error);
    return { error };
  }
}
