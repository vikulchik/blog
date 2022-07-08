import axios from "axios";
import { IRegisterRequest } from "../DTOs/register-request-dto";
import { IRegisterResponse } from "../DTOs/register-response-dto";
import { config } from "../config";
import { localStorageService } from "./local-storage.service";
import { ILoginRequest } from "../DTOs/login-request-dto";
import { ILoginResponse } from "../DTOs/login-response-dto";

async function register(body: IRegisterRequest): Promise<any> {
  const { data } = await axios
    .post<IRegisterRequest, IRegisterResponse>(`${ config.apiUrl }/auth/register`, body);

  if (data.token) {
    localStorageService.save("token", data.token);
  }
}

async function login(body: ILoginRequest): Promise<any> {
  const { data } = await axios
    .post<ILoginRequest, ILoginResponse>(`${ config.apiUrl }/auth/login`, body);

  if (data.token) {
    localStorageService.save("token", data.token);
  }
}

function logout(): void {
  localStorageService.remove("token");
}

export const auth = {
  register,
  logout,
  login
};
