"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface BackButtonProps {
  href: string;
  label: string;
  disabled?: boolean;
}

export const BackButton = ({ href, label, disabled }: BackButtonProps) => {
  return (
    <Button variant="link" className="font-normal w-full" size="sm" asChild>
      <Link className={disabled ? "pointer-events-none" : ""} href={href}>
        {label}
      </Link>
    </Button>
  );
};
