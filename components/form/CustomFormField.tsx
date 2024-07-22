import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

export enum FormFieldType {
  INPUT = "input",
  CHECKBOX = "checkbox",
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
          {props.fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}
          <RenderInput field={field} props={props} />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
