import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { toast, ToastContainer } from "react-toastify";
import { IRegisterRequest } from "../../DTOs/register-request-dto";
import { auth } from "../../services/auth.serivce";
import "react-toastify/dist/ReactToastify.css";
import { ErrorResponseDto } from "../../DTOs/error-response-dto";

export function Register(): JSX.Element {
  const [name, setName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const navigate = useNavigate();

  const body: IRegisterRequest = {
    email,
    password
  };

  async function register(): Promise<void> {
    try {
      await auth.register(body);

      toast.success("Регистрация прошла успешно 🥳", {
        position: toast.POSITION.TOP_CENTER
      });

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

    await register();
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
          <h1>Регистрация</h1>
          <TextField
            id="outlined-name-input"
            label="Name"
            type="text"
            autoComplete="current-password"
            value={ name }
            onChange={ ({ target }: any): any => setName(target.value) }
          />
          <TextField
            id="outlined-lastName-input"
            label="Last Name"
            type="text"
            autoComplete="current-password"
            value={ lastName }
            onChange={ ({ target }: any): any => setLastName(target.value) }
          />
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
          <TextField
            id="outlined-confirm-password-input"
            label="Confirm password"
            type="password"
            autoComplete="current-password"
            value={ confirmPassword }
          />
          <Button type="submit" variant="contained">Зарегистрироваться</Button>
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
      </Grid>
    </>
  );
}
