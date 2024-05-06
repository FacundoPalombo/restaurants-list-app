"use client";
import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import clsx from "clsx";

import { useCallback, useRef, useState } from "react";

export default function Form() {
  const [description, setDescription] = useState("");
  const [file, setFile] = useState();
  const fileRef = useRef(null);

  const onInputFile = useCallback(
    (event) => {
      console.log(event.target.files);
      setFile(URL.createObjectURL(event.target.files[0]));
    },
    [fileRef]
  );

  return (
    <form className="flex flex-col-reverse gap-6 items-center sm:flex-row">
      <button
        className="my-4"
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
          Añadir imagen
        </div>
      </button>
      <input
        type="file"
        hidden
        onChange={onInputFile}
        ref={fileRef}
        name="image"
      />
      <div className="flex flex-col gap-4 px-4 w-full ">
        <Input
          hierarchy="loud"
          label="Nombre"
          placeholder="Escribe el nombre"
          type="text"
          name="name"
        />
        <Input
          hierarchy="loud"
          label="Dirección"
          placeholder="Escribe la dirección"
          type="text"
          name="address"
        />
        <Input
          hierarchy="loud"
          label="Latitud"
          placeholder="Escribe la latitud"
          type="text"
          name="latlng[lat]"
        />
        <Input
          hierarchy="loud"
          label="Longitud"
          placeholder="Escribe la longitud"
          type="text"
          name="latlng[lng]"
        />
        <label
          htmlFor="email"
          className={clsx("text-lg md:text-xl text-black")}
        >
          Descripción
        </label>
        <input type="text" name="description" hidden value={description} />
        <textarea
          className={clsx(
            "h-full w-full rounded-3xl p-2 border-2  border-black shadow-lg"
          )}
          onChange={(e) => setDescription(e.target.value)}
          name="description"
        ></textarea>

        <Button
          type="submit"
          label="Guardar"
          className="bg-tailor-blue border text-white hover:bg-blue-500 active:bg-blue-700 transition-colors"
        />
      </div>
    </form>
  );
}
