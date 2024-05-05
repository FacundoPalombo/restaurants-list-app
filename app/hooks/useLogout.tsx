"use client";
import useSWR from "swr";
import fetcher from "@/app/utils/fetcher";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

// That hook trigger the logout operation on client components.
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
