"use server";

import {
  CreateRestaurantRequestSchema,
  CreateRestaurantFormState,
} from "../lib/definitions";
import {
  createRestaurant as createRestaurantService,
  deleteRestaurant as deleteRestaurantService,
  updateRestaurant as updateRestaurantService,
} from "../services/restaurants";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function createRestaurant(
  state: CreateRestaurantFormState,
  formData: FormData
) {
  // get formdata values for early data validation
  const image = formData.get("image");
  const address = formData.get("address");
  const name = formData.get("name");
  const description = formData.get("description");
  const lat = formData.get("latlng[lat]");
  const lng = formData.get("latlng[lng]");

  console.log(image);

  const validatedFields = CreateRestaurantRequestSchema.safeParse({
    image,
    address,
    name,
    description,
    "latlng[lat]": lat,
    "latlng[lng]": lng,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const response = await createRestaurantService({ formData });

    if (response?.message === "Created") {
      revalidatePath("/restaurants");
      NextResponse.redirect(
        new URL("/restaurants/create/success", response.nextUrl)
      );
    }
    if (response?.error) {
      return { error: response?.error };
    }
  } catch (error) {
    console.error(error);
    return { error };
  }
}

// #region update
export async function updateRestaurant(
  restaurantId: string,
  formData: FormData
) {
  console.log(formData);
  // get formdata values for early data validation
  const image = formData.get("image");
  const address = formData.get("address");
  const name = formData.get("name");
  const description = formData.get("description");
  const lat = formData.get("latlng[lat]");
  const lng = formData.get("latlng[lng]");

  // Validate form fields
  const validatedFields = CreateRestaurantRequestSchema.safeParse({
    image,
    address,
    name,
    description,
    "latlng[lat]": lat,
    "latlng[lng]": lng,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  try {
    const response = await updateRestaurantService({
      restaurantId,
      formData,
    });
    if (response) return { message: "Updated" };
  } catch (error) {
    return { error };
  }
}

export async function deleteRestaurant(restaurantId: string) {
  console.log(restaurantId);
  try {
    const response = await deleteRestaurantService({ restaurantId });
    if (response) return { message: "Deleted" };
  } catch (error) {
    return { error };
  }
}
