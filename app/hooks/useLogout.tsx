"use client";
import useSWR from "swr";
import fetcher from "@/app/utils/fetcher";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function useLogout(doLogout: boolean) {
  const router = useRouter();

  const { data, error, isLoading } = useSWR(
    doLogout ? "/api/logout" : null,
    fetcher
  );
  useEffect(() => {
    if (data?.payload === "Accepted") {
      console.log("llego");
      router.push("/login");
    }
  }, [data]);
  return { logout: data, error, isLoading };
}
