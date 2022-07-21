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
import {
  isCorrectlyLength,
  isRequired,
  isSame,
  isValid,
  isValidEmail
} from "../../helpers/validation";
import { getErrorMessage, getSuccessMessage } from "../../helpers/notification";
import { ValidationOption } from "../../interfaces/validation.interface";

export function Register(): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");


  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const navigate = useNavigate();

  const authContext = useContext<IAuthContext | null>(AuthContext);

  const body: IRegisterRequest = {
    email,
    password,
    name
  };

  async function register(): Promise<void> {
    try {
      await auth.register(body);
      authContext?.setAuthContext({
        name: body.name,
        email: body.email
      });

      getSuccessMessage("Регистрация прошла успешно 🥳");

      setTimeout(() => {
        navigate("/");
      }, 3000);

    } catch (e: unknown) {
      const error = e as ErrorResponseDto;

      getErrorMessage("Что-то пошло не так 😢!");
      getErrorMessage(error.response.data as unknown as string);

      console.error(e);
    }
  }


  const options: ValidationOption = {
    confirmPassword: [{ fn: (field: string) => isSame(field, password), msg: "Пароли не совпадают" }],
    email: [{ fn: isValidEmail, msg: "Не валидный email" }],
    name: [{ fn: isRequired, msg: "Не введено имя пользователя" }],
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

  async function onSubmit(e: React.FormEvent<HTMLFormElement>): Promise<any> {
    e.preventDefault();

    const errors = isValid({
      email,
      name,
      password,
      confirmPassword
    }, options);

    setErrors(errors);
    if (Object.keys(errors).length) {
      return;
    }
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
            id="outlined-username-input"
            className="field"
            label="Username"
            type="text"
            autoComplete="current-password"
            value={ name }
            onChange={ ({ target }: any): any => setName(target.value) }
          />
          { errors.name && errors.name.map((error) => <p className="error">{ error }</p>) }
          <TextField
            id="outlined-email-input"
            className="field"
            label="Email"
            type="email"
            autoComplete="current-password"
            value={ email }
            onChange={ ({ target }: any): any => setEmail(target.value) }
          />
          { errors.email && errors.email.map((error) => <p className="error">{ error }</p>) }
          <TextField
            id="outlined-password-input"
            className="field"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={ password }
            onChange={ ({ target }: any): any => setPassword(target.value) }
          />
          { errors.password && errors.password.map((error) => <p className="error">{ error }</p>) }

          <TextField
            id="outlined-confirm-password-input"
            className="field"
            label="Confirm password"
            type="password"
            autoComplete="current-password"
            value={ confirmPassword }
            onChange={ ({ target }: any): any => setConfirmPassword(target.value) }
          />
          { errors.confirmPassword && errors.confirmPassword.map((error) => <p className="error">{ error }</p>) }
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
