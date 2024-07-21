"use client";

import { LOGIN_URL } from "@/lib/config";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface LoginButtonProps {
  children: ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export const LoginButton = ({ children, mode, asChild }: LoginButtonProps) => {
  const router = useRouter();

  const onClick = () => {
    router.push(`${LOGIN_URL}`);
  };

  if (mode === "modal") {
    return <span>TODO: Implement modal</span>;
  }

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};
