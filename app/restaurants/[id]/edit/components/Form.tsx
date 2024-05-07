"use client";

import { updateRestaurant } from "@/app/actions/restaurant";
import {
  InputFile,
  InputsText,
} from "@/app/restaurants/create/components/Form";
import { useParams } from "next/navigation";

import { useEffect } from "react";
import { useFormState } from "react-dom";
import { Toaster, toast } from "sonner";

export default function Form() {
  const { id } = useParams();
  const updateRestaurantWithId = updateRestaurant.bind(null, id as string);

  return (
    <form
      action={updateRestaurantWithId}
      className="relative flex flex-col-reverse px-6 gap-6 items-center sm:flex-row"
    >
      <InputFile />
      <InputsText />
      <Toaster richColors />
    </form>
  );
}
