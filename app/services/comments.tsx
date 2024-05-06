import "server-only";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { API_BASE_URL } from "../utils/constants";
import createHttpError from "http-errors";

type CommentServiceParams = {
  restaurantId: string;
  formData: FormData;
};

// #region create
export async function createComment({
  restaurantId,
  formData,
}: CommentServiceParams) {
  const session = cookies()?.get("session")?.value;
  if (!session) {
    throw new Error("Should be logged in");
  }

  // Prepare request headers
  const headers = new Headers();
  headers.append("Content-Type", "application/x-www-form-urlencoded");
  headers.append("Authorization", session.toString());

  const comment = formData.get("comment");
  const rating = formData.get("rating");

  // Generate encoded params for POST api
  const encodedData = new URLSearchParams();

  if (typeof comment === "string" && typeof rating === "string") {
    encodedData.append("comment", comment);
    encodedData.append("rating", rating);
  }

  const request = new Request(
    new URL(`/api/restaurant/${restaurantId}/comment`, API_BASE_URL),
    {
      method: "POST",
      cache: "no-cache",
      mode: "cors",
      headers,
      body: encodedData,
    }
  );

  try {
    const response = await fetch(request);
    console.log(response);

    const payload = await response.text();

    if (response?.ok) {
      revalidatePath(`/restaurants/${restaurantId}`);
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

// #region update

export async function updateComment({
  restaurantId,
  commentId,
  formData,
}: {
  restaurantId: string;
  commentId: string;
  formData: FormData;
}) {
  const session = cookies()?.get("session")?.value;
  if (!session) {
    throw new Error("Should be logged in");
  }

  // Prepare request headers
  const headers = new Headers();
  headers.append("Content-Type", "application/x-www-form-urlencoded");
  headers.append("Authorization", session.toString());

  const comment = formData.get("comment");
  const rating = formData.get("rating");

  // Generate encoded params for POST api
  const encodedData = new URLSearchParams();

  if (typeof comment === "string" && typeof rating === "string") {
    encodedData.append("comment", comment);
    encodedData.append("rating", rating);
  }

  const request = new Request(
    new URL(
      `/api/restaurant/${restaurantId}/comment/${commentId}`,
      API_BASE_URL
    ),
    {
      method: "PUT",
      cache: "no-cache",
      mode: "cors",
      headers,
      body: encodedData,
    }
  );

  try {
    const response = await fetch(request);

    const payload = await response.text();
    if (response?.ok) {
      revalidatePath(`/restaurants/${restaurantId}`);
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
// #region delete

export async function deleteComment({
  restaurantId,
  commentId,
}: {
  restaurantId: string;
  commentId: string;
}) {
  const session = cookies()?.get("session")?.value;
  if (!session) {
    throw new Error("Should be logged in");
  }

  // Prepare request headers
  const headers = new Headers();
  headers.append("Content-Type", "application/x-www-form-urlencoded");
  headers.append("Authorization", session.toString());

  const request = new Request(
    new URL(
      `/api/restaurant/${restaurantId}/comment/${commentId}`,
      API_BASE_URL
    ),
    {
      method: "DELETE",
      cache: "no-cache",
      mode: "cors",
      headers,
    }
  );

  try {
    const response = await fetch(request);

    const payload = await response.text();
    if (response?.ok) {
      revalidatePath(`/restaurants/${restaurantId}`);
      return { ok: true, message: payload };
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
