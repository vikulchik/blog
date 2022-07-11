import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "../../services/auth.serivce";
import { ErrorResponseDto } from "../../DTOs/error-response-dto";
import { ILoginRequest } from "../../DTOs/login-request-dto";
import { errorMessage } from "../../helpers/validation";
import { ToastContainer } from "react-toastify";

export function Login(): JSX.Element {
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const navigate = useNavigate();

  const body: ILoginRequest = {
    email,
    password
  };

  let isValid = true;

  async function login(): Promise<void> {
    try {
      await auth.login(body);

      setTimeout(() => {
        navigate("/");
      }, 3000);

    } catch (e: unknown) {
      const error = e as ErrorResponseDto;

      isValid = false;

      errorMessage("Что-то пошло не так 😢!");
      errorMessage(error.response.data as unknown as string);

      if (email.trim().length === 0 || password.trim().length === 0) {
        Object.values(error.response.data.errors).forEach((errors) => {
          const errorMsg = errors.join("; ");
          errorMessage(errorMsg);
        });
      }
      console.error(e);
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    if (isValid) {
      await login();
    }
  }

  return (
    <>
      <Link to="/">Homepage</Link>
      <Grid
        container
        spacing={ 2 }
        direction="column"
        justifyContent="center"
        alignItems="center"
        className="wrapper"
      >
        <form encType="multipart/form-data" className="registration-form" onSubmit={ onSubmit }>
          <h1>Авторизироваться</h1>
          <TextField
            id="outlined-email-input"
            label="Email"
            type="email"
            autoComplete="current-password"
            value={ email }
            onChange={ ({ target }: any): any => setEmail(target.value) }
          />
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={ password }
            onChange={ ({ target }: any): any => setPassword(target.value) }
          />
          <Button type="submit" variant="contained">Войти</Button>
        </form>
        <ToastContainer
          position="top-center"
          autoClose={ 2000 }
          hideProgressBar={ false }
          newestOnTop={ false }
          closeOnClick
          rtl={ false }
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Link to="/register">Register</Link>
      </Grid>
    </>
  );
}
