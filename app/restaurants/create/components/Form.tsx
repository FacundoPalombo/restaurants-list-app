"use client";

import { createRestaurant } from "@/app/actions/restaurant";
import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import { TextArea } from "@/app/components/TextArea";
import Spinner from "@/app/components/svg/Spinner";
import clsx from "clsx";
import { NextResponse } from "next/server";

import {
  ChangeEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Toaster, toast } from "sonner";

export default function Form() {
  const [state, action] = useFormState(createRestaurant, undefined);

  useEffect(() => {
    if (state?.error) {
      toast.error("Ups, hubo un error inesperado!");
    }
    if (state?.errors)
      toast.error(
        "Hubo un error cargando el restaurante, verifica la información proporcionada."
      );
  }, [state]);

  return (
    <form
      action={action}
      className="relative flex flex-col-reverse px-6 gap-6 items-center sm:flex-row"
    >
      <InputFile />
      <InputsText />
      <Toaster richColors />
    </form>
  );
}

export function InputFile() {
  const [file, setFile] = useState<File>();
  const [filePreview, setFilePreview] = useState("");

  const fileRef = useRef<HTMLInputElement>(null);

  const onInputFile: ChangeEventHandler<HTMLInputElement> = (event) => {
    const target: HTMLInputElement = event.target;
    if (target && target?.files?.length) {
      setFile(target?.files[0]);
      const fileUrl = URL.createObjectURL(target?.files[0]);
      setFilePreview(fileUrl);
    }
  };
  useEffect(() => {}, [file]);

  return (
    <>
      <button
        className="my-4 drop-shadow-lg"
        type="button"
        onClick={() => fileRef?.current?.click()}
      >
        <div
          id="preview"
          className="rounded-3xl flex justify-center items-center"
          style={{
            width: "300px",
            height: "300px",
            backgroundColor: "lightgrey",
            backgroundImage: `url(${filePreview})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <span className={clsx(file && "hidden")}>Añadir imagen *</span>
        </div>
      </button>
      <input
        type="file"
        name="image"
        accept=".jpg, .pdf, .jpeg"
        hidden
        onChange={onInputFile}
        ref={fileRef}
      />
    </>
  );
}

export function InputsText() {
  const { pending } = useFormStatus();
  return (
    <div className="flex flex-col gap-4 px-4 w-full ">
      <Input
        autocomplete={false}
        loading={pending}
        hierarchy="loud"
        label="Nombre *"
        placeholder="Escribe el nombre"
        type="text"
        name="name"
      />
      <Input
        autocomplete={false}
        loading={pending}
        hierarchy="loud"
        label="Dirección *"
        placeholder="Escribe la dirección"
        type="text"
        name="address"
      />
      <Input
        autocomplete={false}
        loading={pending}
        hierarchy="loud"
        label="Latitud *"
        placeholder="Escribe la latitud"
        type="text"
        name="latlng[lat]"
      />
      <Input
        autocomplete={false}
        loading={pending}
        hierarchy="loud"
        label="Longitud *"
        placeholder="Escribe la longitud"
        type="text"
        name="latlng[lng]"
      />
      <label
        htmlFor="description"
        className={clsx("text-lg md:text-xl text-black")}
      >
        Descripción
      </label>
      <TextArea name="description" className={clsx("h-full w-full ")} />

      <Button
        type="submit"
        hierarchy="loud"
        size="xl"
        disabled={pending}
        rounded="full"
        label="Guardar"
      >
        {pending && <Spinner />}
      </Button>
    </div>
  );
}
