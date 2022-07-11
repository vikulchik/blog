import React, { useContext, useState } from "react";
import { Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { ToastContainer } from "react-toastify";
import { IRegisterRequest } from "../../DTOs/register-request-dto";
import { auth } from "../../services/auth.serivce";
import "react-toastify/dist/ReactToastify.css";
import { ErrorResponseDto } from "../../DTOs/error-response-dto";
import { AuthContext } from "../../context/auth.context";
import { IAuthContext } from "../../interfaces/auth-context.interface";
import { errorMessage, isValidEmail, successMessage } from "../../helpers/validation";

export function Register(): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const navigate = useNavigate();

  const authContext = useContext<IAuthContext | null>(AuthContext);

  const body: IRegisterRequest = {
    email,
    password,
    name
  };

  let isValid = true;

  async function register(): Promise<void> {
    try {
      await auth.register(body);
      authContext?.setAuthContext({
        name: body.name,
        email: body.email
      });

      successMessage("Регистрация прошла успешно 🥳");

      setTimeout(() => {
        navigate("/");
      }, 3000);

    } catch (e: unknown) {
      const error = e as ErrorResponseDto;

      errorMessage("Что-то пошло не так 😢!");
      errorMessage(error.response.data as unknown as string);

      console.error(e);
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    validation();
    if (isValid) {
      await register();
    }
  }

  function validation(): any {
    if (password !== confirmPassword) {
      errorMessage("Пароли не совпадают!");

      isValid = false;
    }

    if (!isValidEmail(email)) {
      errorMessage("Не валидный email");

      isValid = false;
    }

    if (name.trim().length === 0 || password.trim().length === 0) {
      errorMessage("Не все поля заполнены");

      isValid = false;
    }

    if (password.trim().length < 6) {
      errorMessage("Знаков в пароле должно быть больше 6");

      isValid = false;
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
          <h1>Регистрация</h1>
          <TextField
            id="outlined-username-input"
            label="Username"
            type="text"
            autoComplete="current-password"
            value={ name }
            onChange={ ({ target }: any): any => setName(target.value) }
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
            onChange={ ({ target }: any): any => setConfirmPassword(target.value) }
          />
          <Button type="submit" variant="contained">Зарегистрироваться</Button>
          <Link to="/login">Login</Link>
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
