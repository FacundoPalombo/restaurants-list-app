import "server-only";

import { API_BASE_URL } from "../utils/constants";
import { z } from "zod";
import { cookies, headers } from "next/headers";
import { RestaurantDetail } from "../lib/definitions";

// #region Restaurant
// inline definitions
const RestaurantsSchema = z.object({
  page: z.string({ message: "El parametro [page] es requerido" }),
});
type Restaurants = z.infer<typeof RestaurantsSchema>;

export async function getRestaurants({ page }: Restaurants) {
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

// #region RestaurantDetail
// inline definitions
const RestaurantsDetailRequestSchema = z.object({
  id: z.string({ message: "El parametro [id] es requerido" }),
});
type RestaurantsDetailRequest = z.infer<typeof RestaurantsSchema>;

export async function getRestaurantDetail({ id }) {
  const session = cookies().get("session")?.value as string;

  const request = new Request(
    new URL(`/api/restaurant/detail/${id}`, API_BASE_URL),
    {
      method: "GET",
      headers: {
        Authorization: session?.toString(),
      },
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
