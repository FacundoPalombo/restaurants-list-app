"use server";

import { CreateCommentSchema } from "../lib/definitions";
import {
  createComment,
  updateComment,
  deleteComment as DeleteComment,
} from "../services/comments";
// #region create
export async function create(restaurantId: string, formData: FormData) {
  const comment = formData.get("comment");
  const rating = formData.get("rating");

  // Validate form fields
  const validatedFields = CreateCommentSchema.safeParse({
    comment: comment,
    rating: parseInt(rating as string),
  });

  if (!validatedFields.success) {
    console.log(formData, "tremendo 2");

    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  console.log(formData, "tremendo");
  try {
    const response = await createComment({ restaurantId, formData });

    console.log(response);
    if (response) return { message: response };
  } catch (error) {
    return { error };
  }
}
// #region update
export async function update(
  commentId: string,
  restaurantId: string,
  formData: FormData
) {
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
    const response = await updateComment({ commentId, restaurantId, formData });
    if (response) return "Updated";
  } catch (error) {
    return { error };
  }
}

// #region delete

export async function deleteComment(restaurantId: string, commentId: string) {
  // Validate form fields
  try {
    const response = await DeleteComment({ restaurantId, commentId });
    if (response) return { data: "Deleted" };
  } catch (error) {
    return { error };
  }
}
