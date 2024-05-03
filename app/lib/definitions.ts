import { z } from "zod";

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
