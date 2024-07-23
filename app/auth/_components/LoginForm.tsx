"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { CardWrapper } from "./CardWrapper";
import { LoginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { FormError } from "@/components/form/FormError";
import { FormSuccess } from "@/components/form/FormSuccess";
import {
  CustomFormField,
  FormFieldType,
} from "@/components/form/CustomFormField";
import { login } from "@/actions/auth/login";
import { useState, useTransition } from "react";
import { SubmitButton } from "@/components/form/SubmitButton";
import { useStatus } from "@/hooks/useStatus";
import { useSearchParams } from "next/navigation";
import { REGISTER_URL } from "@/lib/config";
import { ForgotButton } from "./ForgotButton";

const LoginForm = () => {
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider!"
      : "";

  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { error, setError, success, setSuccess, clearStatus } = useStatus();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      code: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    clearStatus();
    setIsSubmitting(true); // Start submitting
    startTransition(() => {
      login(values)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data?.error);
          }

          if (data?.success) {
            form.reset();
            setSuccess(data?.success);
          }

          if (data?.twoFactor) {
            setShowTwoFactor(true);
          }
        })
        .catch(() => setError("Something went wrong"))
        .finally(() => setIsSubmitting(false)); // End submitting
    });
  };

  const emailValue = form.watch("email");
  const passwordValue = form.watch("password");
  const isOTPValid = form.watch("code")?.length === 6;
  const isFormValid = emailValue?.length > 0 && passwordValue?.length > 5;

  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref={REGISTER_URL}
      showSocial={!showTwoFactor}
      disabled={isPending}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {showTwoFactor && (
              <CustomFormField
                control={form.control}
                name="code"
                label="Please enter the one-time password sent to your email."
                fieldType={FormFieldType.InputOTP}
                disabled={isPending}
              />
            )}
            {!showTwoFactor && (
              <>
                <CustomFormField
                  control={form.control}
                  name="email"
                  label="Email"
                  placeholder="john.doe@example.com"
                  fieldType={FormFieldType.INPUT}
                  inputType="email"
                  disabled={isPending}
                />
                <CustomFormField
                  control={form.control}
                  name="password"
                  label="Password"
                  placeholder="******"
                  fieldType={FormFieldType.INPUT}
                  inputType="password"
                  disabled={isPending}
                />
                <ForgotButton disabled={isPending}>
                  Forgot password?
                </ForgotButton>
              </>
            )}
          </div>
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <SubmitButton
            isLoading={(!isOTPValid && showTwoFactor) || !isFormValid}
            isSubmitting={isSubmitting}
            className="w-full"
          >
            {showTwoFactor ? "Confirm" : "Login"}
          </SubmitButton>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
