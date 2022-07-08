export interface ILoginResponse {
  data: {
    name: string;
    token: string;
  };
  status: number;
}
