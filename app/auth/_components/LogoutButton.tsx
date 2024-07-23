"use client";

import { logout } from "@/actions/auth/logout";
import { ReactNode } from "react";

interface LoginButtonProps {
  children?: ReactNode;
}

export const LogoutButton = ({ children }: LoginButtonProps) => {
  const onClick = () => {
    logout();
  };

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};
