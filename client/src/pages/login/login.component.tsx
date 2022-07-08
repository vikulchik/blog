import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "../../services/auth.serivce";
import { toast } from "react-toastify";
import { ErrorResponseDto } from "../../DTOs/error-response-dto";
import { ILoginRequest } from "../../DTOs/login-request-dto";

export function Login(): JSX.Element {
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const navigate = useNavigate();

  const body: ILoginRequest = {
    email,
    password
  };

  async function login(): Promise<void> {
    try {
      await auth.login(body);

      setTimeout(() => {
        navigate("/");
      }, 3000);

    } catch (e: unknown) {
      const error = e as ErrorResponseDto;
      toast.error("Что-то пошло не так 😢!", {
        position: toast.POSITION.TOP_LEFT
      });

      Object.values(error.response.data.errors).forEach((errors) => {
        const errorMsg = errors.join("; ");
        toast.error(errorMsg, {
          position: toast.POSITION.TOP_LEFT
        });
      });
      console.error(e);
    }

  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();

    await login();
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
            id="outlined-email-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={ password }
            onChange={ ({ target }: any): any => setPassword(target.value) }
          />
          <Button type="submit" variant="contained">Войти</Button>
          <Link to="/register">Register</Link>
        </form>
      </Grid>
    </>
  );
}
