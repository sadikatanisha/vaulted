// executeAction.ts  (dev debug version)
import { isRedirectError } from "next/dist/client/components/redirect-error";

type Options<T> = {
  actionFn: () => Promise<T>;
  successMessage?: string;
};

const executeAction = async <T>({
  actionFn,
  successMessage = "The action was successful",
}: Options<T>): Promise<{
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}> => {
  try {
    const result = await actionFn();
    return {
      success: true,
      message: successMessage,
      data: result,
    };
  } catch (error: any) {
    if (isRedirectError(error)) throw error; // preserve redirect handling

    // log full error server-side
    console.error("[executeAction] caught error:", error);

    // return minimal error string to the client for debugging in dev
    return {
      success: false,
      message: "An error has occurred during executing the action",
      error: error?.message ? String(error.message) : String(error),
    };
  }
};

export { executeAction };
