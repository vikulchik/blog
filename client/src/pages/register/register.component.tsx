import React, { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { Promise } from "q";

interface IRegister {
  email: string;
  password: string;
}

export function Register(): JSX.Element {
  const [name, setName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const body: IRegister = {
    email,
    password
  };

  useEffect(() => {
    axios
      .post("http://localhost:5000/api", body)
      .then((response) => console.log(response))
      .catch((error) => console.log("error"));
  }, [name]);

  function onInput(e: any): any {
    const { value } = e.target;
    setName(value);
  }

  return (
    <>
      <Link to="/">Homepage</Link>
      <Grid container
            spacing={ 2 }
            direction="column"
            justifyContent="center"
            alignItems="center"
            className="wrapper"
      >
        <form encType="multipart/form-data" className="registration-form">
          <h1>Регистрация</h1>
          <TextField
            id="outlined-name-input"
            label="Name"
            type="text"
            autoComplete="current-password"
            value={ name }
            onInput={ onInput }
          />
          <TextField
            id="outlined-lastName-input"
            label="Last Name"
            type="text"
            autoComplete="current-password"
            value={ lastName }
          />
          <TextField
            id="outlined-email-input"
            label="Email"
            type="email"
            autoComplete="current-password"
            value={ email }
          />
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={ password }
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
      </Grid>
    </>
  );
}
