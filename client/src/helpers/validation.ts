import { toast } from "react-toastify";

export function isValidEmail(email: string): boolean {
  return /\S+@\S+\.\S+/.test(email);
}

export function errorMessage(msg: string): any {
  return toast.error(msg, {
    position: toast.POSITION.TOP_CENTER
  });
}

export function successMessage(msg: string): any {
  return toast.success(msg, {
    position: toast.POSITION.TOP_CENTER
  });
}
