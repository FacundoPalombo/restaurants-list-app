"use server";

import { CreateRestaurantRequestSchema } from "../lib/definitions";
import { createRestaurant as createRestaurantService } from "../services/restaurants";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function createRestaurant(state, formData: FormData) {
  // get formdata values for early data validation
  const image = formData.get("image");
  const address = formData.get("address");
  const name = formData.get("name");
  const description = formData.get("description");
  const lat = formData.get("latlng[lat]");
  const lng = formData.get("latlng[lng]");
  console.log(description, "tremenda descripcion");

  const validatedFields = CreateRestaurantRequestSchema.safeParse({
    image,
    address,
    name,
    description,
    "latlng[lat]": lat,
    "latlng[lng]": lng,
  });
  console.log(image);

  console.log(validatedFields.error?.flatten());
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const response = await createRestaurantService({ formData });

    if (response?.message === "Created") {
      revalidatePath("/restaurants");
      return NextResponse.redirect(
        new URL("/restaurants/create/success", response.nextUrl)
      );
    } else {
      return { error: response?.error };
    }
  } catch (error) {
    console.error(error);
    return { error };
  }
}
