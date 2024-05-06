"use client";
import useSWR from "swr";
import fetcher from "@/app/utils/fetcher";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

// That hook trigger the logout operation on client components.
//? I thought that this operation i will gonna need later at the beggining of the project, But later i realized that its not necesary that operation, so YAGNI.
//? unless i refactor this to use server actions, i just let a comment to:
//TODO: refactor this, remove and use server actions
export default function useLogout(doLogout: boolean) {
  const router = useRouter();

  const { data, error, isLoading } = useSWR(
    doLogout ? "/api/logout" : null,
    fetcher
  );
  useEffect(() => {
    if (data?.payload === "Accepted") {
      router.push("/login");
    }
  }, [data]);
  return { logout: data, error, isLoading };
}
