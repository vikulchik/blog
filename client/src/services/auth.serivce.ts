import axios from "axios";
import { IRegisterRequest } from "../DTOs/register-request-dto";
import { IRegisterResponse } from "../DTOs/register-response-dto";

function register(body: IRegisterRequest): Promise<any> {
  return axios
    .post<IRegisterRequest, IRegisterResponse>("http://localhost:5000/api/auth/register", body, {
      headers: {
        "Content-Type": "Application/json"
      }
    });
}

export const auth = {
  register
};
