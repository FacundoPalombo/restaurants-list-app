import "server-only";

import { API_BASE_URL } from "../utils/constants";
import { cookies } from "next/headers";
import {
  RestaurantsRequest,
  RestaurantsDetailRequest,
  CreateRestaurantRequest,
} from "../lib/definitions";

import { NextRequest } from "next/server";

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
  // headers.append("Content-Type", "multipart/form-data");
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
      const error = await response.json();
      return { error: error?.message };
    }
  } catch (error) {
    console.error(error);
    return { error };
  }
}
