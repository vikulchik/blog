export interface IAuthContext {
  value: {
    name: string,
    email: string
  } | null,
  setAuthContext: (context: any) => void;
}
