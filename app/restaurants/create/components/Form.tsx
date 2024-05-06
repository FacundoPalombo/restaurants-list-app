"use client";

import { createRestaurant } from "@/app/actions/restaurant";
import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import clsx from "clsx";

import { useCallback, useEffect, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

export default function Form() {
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const fileRef = useRef(null);

  const [state, action] = useFormState(createRestaurant, { message: "" });

  const { pending, data } = useFormStatus();

  const onInputFile = useCallback(
    (event) => {
      console.log(event.target.files);
      setFile(event.target.files[0]);
    },
    [fileRef]
  );

  useEffect(() => {
    console.log(description);
  }, [description]);

  return (
    <form
      action={action}
      className="relative flex flex-col-reverse px-6 gap-6 items-center sm:flex-row"
    >
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
            backgroundImage: `url(${file})`,
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
        <input type="text" name="description" hidden value={description} />
        <textarea
          className={clsx(
            "h-full w-full rounded-3xl p-2 border-2  border-black shadow-lg",
            pending && "animation-pulse"
          )}
          onChange={(e) => setDescription(e.target.value.trim())}
        ></textarea>

        <Button
          type="submit"
          hierarchy="loud"
          size="xl"
          rounded="full"
          label="Guardar"
        />
      </div>
    </form>
  );
}
