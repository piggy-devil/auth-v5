"use client";

import { z } from "zod";
import { CardWrapper } from "./CardWrapper";
import { useForm } from "react-hook-form";
import { PasswordSchema, RegisterSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { FormError } from "@/components/form/FormError";
import { FormSuccess } from "@/components/form/FormSuccess";
import {
  CustomFormField,
  FormFieldType,
} from "@/components/form/CustomFormField";
import { useTransition, useState, useEffect } from "react";
import { register } from "@/actions/auth/register";
import { LOGIN_URL } from "@/lib/config";
import { SubmitButton } from "@/components/form/SubmitButton";
import { useStatus } from "@/hooks/useStatus";

const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const { error, setError, success, setSuccess, clearStatus } = useStatus();
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
    },
  });

  // Check password validity using PasswordSchema
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

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    clearStatus();
    startTransition(() => {
      register(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Create an account"
      backButtonLabel="Already have an account?"
      backButtonHref={LOGIN_URL}
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <CustomFormField
              control={form.control}
              name="name"
              label="Name"
              placeholder="John Doe"
              fieldType={FormFieldType.INPUT}
              inputType="text"
              disabled={isPending}
            />
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
            Create an account
          </SubmitButton>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default RegisterForm;
