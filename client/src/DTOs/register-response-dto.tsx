export interface IRegisterResponse {
  data: {
    email: string;
    name: string;
    token: string;
  };
  status: number;
}
