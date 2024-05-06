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

    if (response) {
      revalidatePath("/restaurants");
      return NextResponse.redirect("/restaurants/add/success");
    }
  } catch (error) {
    console.error(error);
    return error;
  }
}
