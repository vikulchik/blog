export interface IAuthContext {
  value: {
    name: string,
    email: string
  },
  setAuthContext: (context: any) => void;
}
