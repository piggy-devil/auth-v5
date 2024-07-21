"use client";

import { LOGIN_URL } from "@/lib/config";
import { BeatLoader } from "react-spinners";
import CardWrapper from "./CardWrapper";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import useStatus from "@/hooks/useStatus";
import { verification } from "@/actions/auth/verification";
import { FormSuccess } from "@/components/form/FormSuccess";
import { FormError } from "@/components/form/FormError";

export const VerificationForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { error, setError, success, setSuccess } = useStatus();

  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success) {
      router.push("/auth/login");
    }

    if (!token) {
      setError("Missing token!");
      return;
    }

    verification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [router, setError, setSuccess, success, token]);

  useEffect(() => {
    onSubmit();
  }, [error, onSubmit, success]);

  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonLabel="Back to login"
      backButtonHref={LOGIN_URL}
    >
      <div className="flex items-center justify-center w-full">
        {!success && !error && <BeatLoader />}
        <FormSuccess message={success} />
        <FormError message={error} />
      </div>
    </CardWrapper>
  );
};
