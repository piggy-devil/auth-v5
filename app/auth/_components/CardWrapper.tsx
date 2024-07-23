"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ReactNode } from "react";
import { Header } from "./Header";
import { Social } from "./Social";
import { BackButton } from "./BackButton";

interface CardWrapperProps {
  children: ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
  disabled?: boolean;
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
  disabled,
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social isLoading={disabled} />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton
          disabled={disabled}
          label={backButtonLabel}
          href={backButtonHref}
        />
      </CardFooter>
    </Card>
  );
};
