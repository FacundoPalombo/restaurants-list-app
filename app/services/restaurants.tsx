import "server-only";

import { API_BASE_URL } from "../utils/constants";
import { cookies } from "next/headers";
import {
  RestaurantsRequest,
  RestaurantsDetailRequest,
  CreateRestaurantRequest,
} from "../lib/definitions";

import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";

// #region Restaurant
export async function getRestaurants({ page }: RestaurantsRequest) {
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

export async function getRestaurantDetail({ id }: RestaurantsDetailRequest) {
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

export async function createRestaurant({ formData }: { formData: FormData }) {
  const session = cookies().get("session")?.value as string;
  if (!session) throw Error("Unauthorized");

  // Prepare request headers
  const headers = new Headers();
  headers.append("Content-Type", "multipart/form-data;");
  headers.append("Authorization", session.toString());

  const request = new NextRequest(
    new URL("/api/restaurant/create", API_BASE_URL),
    {
      method: "POST",
      cache: "no-cache",
      mode: "cors",
      headers,
      body: formData,
    }
  );

  try {
    const response = await fetch(request);

    if (response?.ok)
      return { message: "Created", nextUrl: request.nextUrl.pathname };
    if (!response?.ok) {
      console.log(response);
      const error = await response.json();
      return { error: error?.message };
    }
  } catch (error) {
    console.error(error);
    return { error };
  }
}

// #region update
export async function updateRestaurant({
  restaurantId,
  formData,
}: {
  restaurantId: string;
  formData: FormData;
}) {
  console.log(formData, "service");
  const session = cookies()?.get("session")?.value;

  if (!session) {
    throw new Error("Should be logged in");
  }

  // Prepare request headers
  const headers = new Headers();

  headers.append("Authorization", session.toString());

  const request = new Request(
    new URL(`/api/restaurant/${restaurantId}`, API_BASE_URL),
    {
      method: "PUT",
      cache: "no-cache",
      mode: "cors",
      headers,
      body: formData,
    }
  );

  console.log(request, "request tremendo");

  try {
    const response = await fetch(request);
    console.log(response);
    if (response?.ok) {
      const payload = await response.text();
      revalidatePath(`/restaurants/[id]`);
      return { message: payload };
    }
    if (!response?.ok) {
      const error = await response.json();
      console.error(error);
      return { error };
    }
  } catch (error) {
    console.error(error);
    return { error };
  }
}

// #region DeleteRestaurant

export async function deleteRestaurant({
  restaurantId,
}: {
  restaurantId: string;
}) {
  const session = cookies()?.get("session")?.value;
  if (!session) {
    throw new Error("Should be logged in");
  }

  // Prepare request headers
  const headers = new Headers();
  headers.append("Authorization", session.toString());

  const request = new Request(
    new URL(`/api/restaurant/${restaurantId}`, API_BASE_URL),
    {
      method: "DELETE",
      cache: "no-cache",
      mode: "cors",
      headers,
    }
  );

  try {
    const response = await fetch(request);

    if (response?.ok) {
      const payload = await response.text();
      console.log(response);
      revalidatePath(`/restaurants`);
      return { message: payload };
    }
    if (!response?.ok) {
      console.log(response);

      const error = await response.json();
      console.error(error);
      return { error };
    }
  } catch (error) {
    console.error(error);
    return { error };
  }
}
