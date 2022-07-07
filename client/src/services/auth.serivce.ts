import axios from "axios";
import { IRegisterRequest } from "../DTOs/register-request-dto";
import { IRegisterResponse } from "../DTOs/register-response-dto";
import { config } from "../config";
import { localStorageService } from "./local-storage.service";

async function register(body: IRegisterRequest): Promise<any> {
  const { data } = await axios
    .post<IRegisterRequest, IRegisterResponse>(`${ config.apiUrl }/auth/register`, body);

  if (data.token) {
    localStorageService.save("token", data.token);
  }
}

function logout(): void {
  localStorageService.remove("token");
}

export const auth = {
  register,
  logout
};
