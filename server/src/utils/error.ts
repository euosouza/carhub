import { MessageError } from "../models/http.interface";

export function handleErrorMessage(error: unknown): string {
  let errorMessage = MessageError.ERROR_GENERIC.toString();

  if (error instanceof Error) {
    errorMessage = error.message;
  }

  return errorMessage;
}
