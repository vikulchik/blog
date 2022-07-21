import { toast } from "react-toastify";

export function getErrorMessage(msg: string): any {
  return toast.error(msg, {
    position: toast.POSITION.TOP_CENTER
  });
}

export function getSuccessMessage(msg: string): any {
  return toast.success(msg, {
    position: toast.POSITION.TOP_CENTER
  });
}

