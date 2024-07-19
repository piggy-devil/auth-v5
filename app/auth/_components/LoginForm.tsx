"use client";

import { useForm } from "react-hook-form";
import CardWrapper from "./CardWrapper";
import { z } from "zod";
import { LoginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form/FormError";
import { FormSuccess } from "@/components/form/FormSuccess";
import {
  CustomFormField,
  FormFieldType,
} from "@/components/form/CustomFormField";
import { login } from "@/actions/auth/login";
import { useTransition } from "react";
import SubmitButton from "@/components/form/SubmitButton";

const LoginForm = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    startTransition(() => {
      login(values);
    });
  };

  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <CustomFormField
              control={form.control}
              name="email"
              label="Email1"
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
          </div>
          <FormSuccess message="Login Success!" />
          <FormError message="Invalid credentials!" />
          <SubmitButton isLoading={isPending} className="w-full">
            Login
          </SubmitButton>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
