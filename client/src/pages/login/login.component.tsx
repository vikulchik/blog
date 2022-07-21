import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "../../services/auth.serivce";
import { ErrorResponseDto } from "../../DTOs/error-response-dto";
import { ILoginRequest } from "../../DTOs/login-request-dto";
import { ToastContainer } from "react-toastify";
import { getErrorMessage } from "../../helpers/notification";
import { isCorrectlyLength, isRequired, isValid, isValidEmail } from "../../helpers/validation";
import { ValidationOption } from "../../interfaces/validation.interface";
import ErrorComponent from "../../component/error.component";

export function Login(): JSX.Element {
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const [errors, setErrors] = useState<Record<string, string[]>>({});
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

      getErrorMessage("Что-то пошло не так 😢!");
      getErrorMessage(error.response.data as unknown as string);

      if (email.trim().length === 0 || password.trim().length === 0) {
        Object.values(error.response.data.errors).forEach((errors) => {
          const errorMsg = errors.join("; ");
          getErrorMessage(errorMsg);
        });
      }
      console.error(e);
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();

    const errors = isValid({
      email,
      password
    }, options);

    setErrors(errors);
    if (Object.keys(errors).length) {
      return;
    }

    await login();
  }

  const options: ValidationOption = {
    email: [
      {
        fn: isValidEmail,
        msg: "Не валидный email"
      }
    ],
    password: [
      {
        fn: (field: string) => isCorrectlyLength(field, 6),
        msg: "Знаков в пароле должно быть больше 6"
      },
      {
        fn: isRequired,
        msg: "Введите свой пароль"
      }
    ]
  };

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
            className="field"
            label="Email"
            type="email"
            autoComplete="current-password"
            value={ email }
            onChange={ ({ target }: any): any => setEmail(target.value) }
          />
          { errors.email && errors.email.map((error) => <ErrorComponent msg={ error }></ErrorComponent>) }
          <TextField
            id="outlined-password-input"
            className="field"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={ password }
            onChange={ ({ target }: any): any => setPassword(target.value) }
          />
          { errors.password && errors.password.map((error) => <ErrorComponent msg={ error }></ErrorComponent>) }
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
