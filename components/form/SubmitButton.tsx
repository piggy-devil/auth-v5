import { ReactNode } from "react";
import { Button } from "../ui/button";

interface ButtonProps {
  children: ReactNode;
  isLoading?: boolean;
  className?: string;
}

const SubmitButton = (props: ButtonProps) => {
  const { isLoading, children, className } = props;

  return (
    <Button type="submit" disabled={isLoading} className={className}>
      {isLoading ? <div>Loading...</div> : children}
    </Button>
  );
};

export default SubmitButton;
