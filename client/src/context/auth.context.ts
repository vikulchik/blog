import React from "react";
import { IAuthContext } from "../interfaces/auth-context.interface";

export const AuthContext = React.createContext<IAuthContext | null>(null);
