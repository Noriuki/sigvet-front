import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import apiService from "../../Services/API";
import { login } from "../../Services/Auth";
import { ContentWrapper, FormWrapper, PageContainer } from "./styled";

export default function SignIn() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLoginData((oldState) => ({ ...oldState, [name]: value }));
  };
  const handleResetPassword = async () => {
    if (loginData.email.length) {
      await apiService.post(`/user/reset`, { email: loginData.email });
      Swal.fire({
        title: "Nova senha gerada!",
        text: "Verifique seu email",
        icon: "success",
      });
    } else {
      Swal.fire({
        title: "Insira seu email",
        text: "Iremos enviar uma nova senha para seu email",
        icon: "warning",
      });
    }
  };
  const submitLogin = async () => {
    if (loginData.email.length && loginData.password.length) {
      try {
        const loginRes = await login(loginData.email, loginData.password);

        if (loginRes) {
          window.location.href = "/";
        }
      } catch (e) {
        Swal.fire({
          title: "Login inválido",
          text: "Verifique seu email / senha",
          icon: "warning",
        });
      }
    }
  };

  return (
    <PageContainer maxWidth="sm">
      <ContentWrapper>
        <img
          src="images/logo-sigvet.svg"
          alt="logo-sigvet"
          style={{ margin: "1rem auto", maxWidth: "200px" }}
        />

        <FormWrapper component="div">
          <div>
            <TextField
              sx={{ color: "#696969" }}
              name="email"
              type="email"
              label="email"
              value={loginData.email}
              onChange={handleInfoChange}
              fullWidth
              variant="outlined"
            />
          </div>
          <div>
            <TextField
              label="Senha"
              fullWidth
              name="password"
              type={showPassword ? "text" : "password"}
              value={loginData.password}
              onChange={handleInfoChange}
              sx={{ color: "#696969" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((oldState) => !oldState)}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              variant="outlined"
            />
            <Button
              style={{
                color: "var(--secondary-400)",
                textDecoration: "underline",
              }}
              onClick={handleResetPassword}
            >
              Gerar nova senha
            </Button>
          </div>
          <Button
            variant="contained"
            sx={{
              display: "flex",
              margin: "25px auto",
              width: "55%",
              height: "45px",
              fontSize: "1.2rem",
            }}
            onClick={() => submitLogin()}
          >
            Logar
          </Button>
          <p style={{ textAlign: "center" }}>
            Gostaria de testar?
            <br />
            <Link
              to="/cadastro"
              style={{
                color: "var(--secondary-400)",
                textDecoration: "underline",
              }}
            >
              Faça um novo cadastro
            </Link>
          </p>
        </FormWrapper>
      </ContentWrapper>
    </PageContainer>
  );
}
