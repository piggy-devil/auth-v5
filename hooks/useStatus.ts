import { useState } from "react";

const useStatus = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const clearStatus = () => {
    setError(undefined);
    setSuccess(undefined);
  };

  return { error, setError, success, setSuccess, clearStatus };
};

export default useStatus;
