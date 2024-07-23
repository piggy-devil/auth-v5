import { Button } from "@/components/ui/button";
import { RESET_URL } from "@/lib/config";
import { ReactNode } from "react";
import Link from "next/link";

type Props = {
  children: ReactNode;
  disabled?: boolean;
};

export const ForgotButton = ({ children, disabled }: Props) => {
  return (
    <Button size="sm" variant="link" asChild className="px-0 font-normal">
      <Link className={disabled ? "pointer-events-none" : ""} href={RESET_URL}>
        {children}
      </Link>
    </Button>
  );
};
