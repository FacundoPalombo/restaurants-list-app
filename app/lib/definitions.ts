import { latLng } from "leaflet";
import { NextResponse } from "next/server";
import { string, z } from "zod";

export const SignupSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "El nombre de usuario tiene que tener al menos 2 caracteres.",
    })
    .trim(),
  email: z
    .string()
    .email({ message: "Por favor ingrese un correo válido." })
    .trim(),
  password: z
    .string()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
    .regex(/[a-zA-Z]/, {
      message: "La contraseña debe tener al menos una letra.",
    })
    .regex(/[0-9]/, { message: "La contraseña debe tener al menos un numero." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "La contraseña debe tener al menos un carácter especial.",
    })
    .trim(),
});

export type SignupFormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export type Signup = z.infer<typeof SignupSchema>;

export const LoginSchema = z.object({
  email: z
    .string()
    .email({ message: "Por favor ingrese un correo válido." })
    .trim(),
  password: z
    .string()
    .min(8, { message: "La contraseña no es valida" })
    .regex(/[a-zA-Z]/, {
      message: "La contraseña no es valida.",
    })
    .regex(/[0-9]/, { message: "La contraseña no es valida." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "La contraseña no es valida.",
    })
    .trim(),
});

export type LoginFormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export type LogoutFormState =
  | void
  | { message?: string }
  | { error?: string }
  | { error?: unknown }
  | undefined;
export type Login = z.infer<typeof LoginSchema>;

export type SessionPayload = {
  userId: string;
  token: string;
  expiresAt: Date;
  refreshToken: string;
};

export type Restaurant = {
  _id: string;
  name: string;
  owner: string;
  address: string;
  latlng: {
    lat: number;
    lng: number;
  };
  image: string;
  reviews: never[];
  createdAt: string;
  updatedAt: string;
  avgRating: number;
};

export type RestaurantList = {
  restaurantList: Restaurant[];
  total: number;
};

export type Review = {
  owner: {
    name: string;
  };
  rating: number;
  comment: string;
  _id: string;
  date: string;
};

export type Reviews = [] | Review[];

export type RestaurantDetail = {
  _id: string;
  name: string;
  owner: {
    name: string;
  };
  address: string;
  latlng: {
    lat: number;
    lng: number;
  };
  image: string;
  reviews: Reviews;
  createdAt: string;
  avgRating: number;
};

export const RestaurantsRequestSchema = z.object({
  page: z.string({ message: "El parametro [page] es requerido" }),
});

export type RestaurantsRequest = z.infer<typeof RestaurantsRequestSchema>;

export const RestaurantsDetailRequestSchema = z.object({
  id: z.string({ message: "El parametro [id] es requerido" }),
});

export type RestaurantsDetailRequest = z.infer<
  typeof RestaurantsDetailRequestSchema
>;

const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = [
  "application/pdf",
  "image/jpg",
  "image/jpeg",
];

export type CreateRestaurantFormState =
  | {
      errors?: {
        image?: string[];
        name?: string[];
        address?: string[];
        "latlng[lat]"?: string[];
        "latlng[lng]"?: string[];
        description?: string[];
      };
      error?: string;
      message?: string;
    }
  | undefined;

export const CreateRestaurantRequestSchema = z.object({
  image: z
    .instanceof(File)
    .refine((file) => {
      return file?.size <= MAX_FILE_SIZE;
    }, `El tamaño maximo de imagen son 5mb.`)
    .refine(
      (file) => ACCEPTED_IMAGE_MIME_TYPES.includes(file?.type),
      "Solo se aceptan los siguientes formatos: .jpg .pdf .jpeg"
    ),
  name: z.string({ message: "El nombre es requerido" }),
  address: z.string({ message: "La dirección es requerida" }),
  "latlng[lat]": z.string({ message: "La latitud es requerida" }),
  "latlng[lng]": z.string({ message: "La longitud es requerida" }),
  description: z.string().optional(),
});

export type CreateRestaurantRequest = z.infer<
  typeof CreateRestaurantRequestSchema
>;

export const CreateCommentSchema = z.object({
  comment: z
    .string({ message: "No puedes enviar un comentario vacío" })
    .min(10, { message: "El comentario minimo es de 10 caracteres" })
    .max(255, "El comentario maximo es de 255 caracteres"),
  rating: z.number({ message: "Por favor proporciona una valoración" }),
});

export type CreateComment = z.infer<typeof CreateCommentSchema>;
