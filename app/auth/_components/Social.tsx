"use client";

import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/lib/config";
import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

type SocialProp = {
  isLoading?: boolean;
};

export const Social = ({ isLoading }: SocialProp) => {
  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex flex-col gap-y-2 items-center w-full sm:gap-x-2 sm:flex-row">
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => onClick("google")}
        disabled={isLoading}
      >
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => onClick("github")}
        disabled={isLoading}
      >
        <FaGithub className="h-5 w-5" />
      </Button>
    </div>
  );
};
