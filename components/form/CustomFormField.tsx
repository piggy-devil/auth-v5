import { Control } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export enum FormFieldType {
  INPUT = "input",
  CHECKBOX = "checkbox",
  InputOTP = "inputOTP",
}

type InputType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "url"
  | "tel"
  | "search"
  | "date"
  | "time"
  | "datetime-local";

interface CustomFormFieldProps {
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  fieldType: FormFieldType;
  inputType?: InputType;
}

const RenderInput = ({
  field,
  props,
}: {
  field: any;
  props: CustomFormFieldProps;
}) => {
  switch (props.fieldType) {
    case FormFieldType.INPUT:
      return (
        <FormControl>
          <Input
            {...field}
            placeholder={props.placeholder}
            disabled={props.disabled}
            type={props.inputType}
          />
        </FormControl>
      );
    case FormFieldType.InputOTP:
      return (
        <>
          <FormControl>
            <InputOTP maxLength={6} {...field}>
              <InputOTPGroup className="w-full justify-center">
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </FormControl>
        </>
      );
  }
};

export const CustomFormField = (props: CustomFormFieldProps) => {
  const { control, name, label } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {props.fieldType !== FormFieldType.CHECKBOX &&
            props.fieldType !== FormFieldType.InputOTP &&
            label && <FormLabel>{label}</FormLabel>}
          <RenderInput field={field} props={props} />
          {props.fieldType === FormFieldType.InputOTP && (
            <FormDescription>{props.label}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
