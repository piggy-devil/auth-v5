import { ReactNode } from "react";
import { Button } from "../ui/button";
import { ClipLoader } from "react-spinners";

interface ButtonProps {
  children: ReactNode;
  isLoading?: boolean;
  className?: string;
}

export const SubmitButton = (props: ButtonProps) => {
  const { isLoading, children, className } = props;

  return (
    <Button type="submit" disabled={isLoading} className={className}>
      {isLoading ? (
        <div className="flex items-center justify-center">
          <ClipLoader size="30px" />
        </div>
      ) : (
        children
      )}
    </Button>
  );
};
