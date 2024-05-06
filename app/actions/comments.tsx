"use server";

import { CreateCommentSchema } from "../lib/comments";

export async function create({ restaurantId, formData }) {
  const comment = formData.get("comment");
  const rating = formData.get("rating");

  // Validate form fields
  const validatedFields = CreateCommentSchema.safeParse({
    comment: formData.get("comment"),
    rating: formData.get("rating"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Generate encoded params for POST api
  const encodedData = new URLSearchParams();
}
