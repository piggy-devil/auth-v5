import CardWrapper from "./CardWrapper";
import { LOGIN_URL } from "@/lib/config";
import { BsExclamationTriangle } from "react-icons/bs";

export const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong!"
      backButtonHref={LOGIN_URL}
      backButtonLabel="Back to login"
    >
      <div className="w-full flex items-center justify-center">
        <BsExclamationTriangle className="text-destructive h-6 w-6" />
      </div>
    </CardWrapper>
  );
};
