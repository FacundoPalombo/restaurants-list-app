"use client";
import { useParams, usePathname } from "next/navigation";
import { MouseEventHandler, useEffect, useState } from "react";

import Button from "@/app/components/Button";
import Delete from "@/app/components/svg/Delete";
import Edit from "@/app/components/svg/Edit";
import { createPortal, useFormState, useFormStatus } from "react-dom";
import { deleteRestaurant } from "@/app/actions/restaurant";
import { toast } from "sonner";
import Cross from "@/app/components/svg/Cross";
import clsx from "clsx";
import Spinner from "@/app/components/svg/Spinner";

export function FloatingActions() {
  const pathname = usePathname();
  const { id } = useParams();

  const [shouldDelete, setShouldDelete] = useState(false);

  const deleteRestaurantWithId = deleteRestaurant.bind(null, id as string);

  const [state, action] = useFormState(deleteRestaurantWithId, undefined);

  const handleOnClickDelete = () => {
    setShouldDelete(true);
  };

  useEffect(() => {
    if (state?.message) {
      toast.success("Eliminado satisfactoriamente");
    }

    if (state?.error) {
      toast.success("Ups, hubo un error al eliminar el restaurante.");
    }
  }, [state]);

  return (
    <div
      className={clsx(
        "absolute z-50 flex flex-row gap-4 -mt-4 -ml-4  items-center justify-end",
        shouldDelete && "hidden"
      )}
    >
      <Button
        type="button"
        iconOnly
        size="md"
        hierarchy="danger"
        className="border border-transparent"
        onClick={handleOnClickDelete}
        tipology="normal"
      >
        <Delete />
      </Button>

      <Button
        type="link"
        size="md"
        href={`${pathname}/edit`}
        iconOnly
        hierarchy="quiet"
        tipology="normal"
      >
        <Edit />
      </Button>
      {createPortal(
        <dialog
          className={clsx(
            "flex flex-col gap-4 bg-slate-200 bg-opacity-70 p-4 rounded-3xl shadow-3xl top-12 mx-4 my-1",
            !shouldDelete && "hidden"
          )}
          open={shouldDelete}
        >
          <div className="flex flex-row-reverse justify-between items-center">
            <button
              className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
              onClick={() => setShouldDelete(false)}
            >
              <Cross />
            </button>
            <span className="text-slate-600 drop-shadow-[0_1.2px_1.2px_rgba(255,255,255,0.8)]">
              Esta acción no se puede revertir...
            </span>
          </div>
          <h2 className="text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text- text-xl break-words">
            ¿Estas seguro de borrar este restaurante?
          </h2>{" "}
          <div className="flex flex-row justify-between gap-4 mx-2">
            <form id="delete-restaurant" action={action}>
              <Submit />
            </form>
            <Button
              label="Cancelar"
              rounded="xl"
              type="button"
              onClick={() => setShouldDelete(false)}
              hierarchy="indifferent"
              tipology="cartoon"
            />{" "}
          </div>
        </dialog>,
        document?.body
      )}
    </div>
  );
}

function Submit() {
  const { pending } = useFormStatus();

  return (
    <Button
      label="Eliminar"
      rounded="xl"
      type="submit"
      form="delete-restaurant"
      hierarchy="danger"
      tipology="cartoon"
    >
      {" "}
      {pending && <Spinner />}
    </Button>
  );
}
