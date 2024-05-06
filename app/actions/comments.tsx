"use server";

import { CreateCommentSchema } from "../lib/comments";
import { createComment } from "../services/comments";

export async function create(restaurantId: string, formData: FormData) {
  const comment = formData.get("comment");
  const rating = formData.get("rating");

  // Validate form fields
  const validatedFields = CreateCommentSchema.safeParse({
    comment: comment,
    rating: parseInt(rating as string),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  try {
    const response = await createComment({ restaurantId, formData });
    if (response) return "Created";
  } catch (error) {
    return error;
  }
}
