"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { CardWrapper } from "./CardWrapper";
import { NewPasswordSchema, PasswordSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { FormError } from "@/components/form/FormError";
import { FormSuccess } from "@/components/form/FormSuccess";
import {
  CustomFormField,
  FormFieldType,
} from "@/components/form/CustomFormField";
import { useEffect, useState, useTransition } from "react";
import { SubmitButton } from "@/components/form/SubmitButton";
import { useStatus } from "@/hooks/useStatus";
import { LOGIN_URL } from "@/lib/config";
import { newPassword } from "@/actions/auth/reset";
import { useSearchParams } from "next/navigation";

export const NewPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [isPending, startTransition] = useTransition();
  const { error, setError, success, setSuccess, clearStatus } = useStatus();

  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    const subscription = form.watch((values) => {
      const password = values.password;
      try {
        PasswordSchema.parse(password);
        setIsPasswordValid(true);
      } catch (e) {
        setIsPasswordValid(false);
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    clearStatus();
    startTransition(() => {
      newPassword(values, token).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);

        if (data.success) {
          form.reset();
        }
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Enter a new password"
      backButtonLabel="Back to login"
      backButtonHref={LOGIN_URL}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <CustomFormField
              control={form.control}
              name="password"
              label="Password"
              placeholder="******"
              fieldType={FormFieldType.INPUT}
              inputType="password"
              disabled={isPending}
            />
            <CustomFormField
              control={form.control}
              name="confirmPassword"
              label="Confirm Password"
              placeholder="******"
              fieldType={FormFieldType.INPUT}
              inputType="password"
              disabled={!isPasswordValid || isPending}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <SubmitButton isLoading={isPending} className="w-full">
            Reset Password
          </SubmitButton>
        </form>
      </Form>
    </CardWrapper>
  );
};
