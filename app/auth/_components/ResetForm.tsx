"use client";

import { useForm } from "react-hook-form";
import CardWrapper from "./CardWrapper";
import { z } from "zod";
import { ResetSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { FormError } from "@/components/form/FormError";
import { FormSuccess } from "@/components/form/FormSuccess";
import {
  CustomFormField,
  FormFieldType,
} from "@/components/form/CustomFormField";
import { useTransition } from "react";
import SubmitButton from "@/components/form/SubmitButton";
import useStatus from "@/hooks/useStatus";
import { LOGIN_URL } from "@/lib/config";
import { reset } from "@/actions/auth/reset";

const ResetForm = () => {
  const [isPending, startTransition] = useTransition();
  const { error, setError, success, setSuccess, clearStatus } = useStatus();

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    clearStatus();
    startTransition(() => {
      reset(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Forgot your password"
      backButtonLabel="Back to login"
      backButtonHref={LOGIN_URL}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <CustomFormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="john.doe@example.com"
              fieldType={FormFieldType.INPUT}
              inputType="email"
              disabled={isPending}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <SubmitButton isLoading={isPending} className="w-full">
            Send reset email
          </SubmitButton>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default ResetForm;
