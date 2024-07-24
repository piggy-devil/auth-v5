"use client";

import { logout } from "@/actions/auth/logout";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface LoginButtonProps {
  children?: ReactNode;
  className?: string;
}

export const LogoutButton = ({ children, className }: LoginButtonProps) => {
  const onClick = () => {
    logout();
  };

  return (
    <span onClick={onClick} className={cn("cursor-pointer", className)}>
      {children}
    </span>
  );
};
