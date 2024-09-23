import { useRef } from "react";

export const useRateLimit = <CallbackArg, CallbackReturn>(callback: (arg: CallbackArg) => CallbackReturn, limit: number) => {
  const inThrottle = useRef<boolean>(false);

  return (args: CallbackArg) => {

    if (!inThrottle.current) {
      callback(args);
      inThrottle.current = true;
      setTimeout(() => inThrottle.current = false, limit);
    }
  }
}