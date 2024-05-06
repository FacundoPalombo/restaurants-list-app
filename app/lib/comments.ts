import { number, string, z } from "zod";

export const CreateCommentSchema = z.object({
  comment: string({ message: "No puedes enviar un comentario vacío" }),
  rating: number({ message: "Por favor proporciona una valoración" }),
});

export type CreateComment = z.infer<typeof CreateCommentSchema>;
