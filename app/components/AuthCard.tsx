import React from "react";
import Logo from "./svg/Logo";

type AuthCardProps = {
  children: React.ReactNode;
};

export default function AuthCard({ children }: AuthCardProps) {
  return (
    <section className="rounded-xl p-4 md:p-5 bg-tailor-blue flex flex-col justify-between gap-4 md:gap-6">
      <Logo fill="white" className="mb-4 md:mb-5" />
      {children}
    </section>
  );
}
