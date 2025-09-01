import { getToken } from "@/storage/auth";
import { Redirect } from "expo-router";
import { PropsWithChildren, useEffect, useState } from "react";

export const Guard = ({ children }: PropsWithChildren) => {
  const [isAllowed, setIsAllowed] = useState<boolean | null>(null);

  const check = async () => {
    const token = await getToken();
    setIsAllowed(!!token);
  };

  useEffect(() => {
    check();
  }, []);

  if (isAllowed === false) {
    return <Redirect href="/(welcome)" />;
  }

  return children;
};
