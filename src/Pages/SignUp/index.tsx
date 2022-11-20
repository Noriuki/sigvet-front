import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import { PatternFormat } from "react-number-format";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import apiService from "../../Services/API";
import externalRequest from "../../Services/API/endpoints/external";
import { getClinicId } from "../../Services/Auth";
import { ContentWrapper, FormWrapper, PageContainer } from "./styled";

export default function SignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [newClinic, setNewClinic] = useState({
    name: "",
    address: {
      cep: "",
      logradouro: "",
      numero: "",
      bairro: "",
      localidade: "",
      uf: "",
    },
    cnpj: "",
    email: "",
    telephone: "",
  });

  const [newUser, setNewUser] = useState({
    clinicId: getClinicId(),
    firstName: "",
    lastName: "",
    email: "",
    role: "admin",
    crmv: "",
    active: 1,
    password: "",
  });

  const handleNewClinic = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewClinic((oldState: any) => ({ ...oldState, [name]: value }));
  };

  const handleNewUser = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewUser((oldState: any) => ({ ...oldState, [name]: value }));
  };

  const handleAddressChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "cep") {
      let cep = value.replace(/\D/g, "");
      if (cep.length === 8) {
        let newAdressInfo = await externalRequest.getAddress(cep);

        setNewClinic((oldState: any) => ({
          ...oldState,
          address: { ...newAdressInfo },
        }));
      }
    } else {
      let newAdressInfo = { ...newClinic.address, [name]: value };
      setNewClinic((oldState: any) => ({
        ...oldState,
        address: { ...newAdressInfo },
      }));
    }
  };

  const handleSave = async () => {
    const newClinicPost = {
      ...newClinic,
      email: newUser.email,
      address: JSON.stringify(newClinic.address),
    };
    try {
      const { data } = await apiService.post(`clinic`, newClinicPost);
      if (data) {
        const newUserPost = { ...newUser, clinicId: data.result.id };
        const userRes = await apiService.post(`user`, newUserPost);
        if (userRes) {
          Swal.fire({ icon: "success", title: "Cadastrado com Sucesso!" }).then(
            (e) => navigate("/login")
          );
        }
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Erro ao fazer o cadastrado! Verifique seus dados",
      });
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
          {step === 1 && (
            <>
              <TextField
                sx={{ color: "#696969" }}
                label="Email"
                name="email"
                fullWidth
                size="medium"
                value={newUser.email}
                onChange={handleNewUser}
                variant="outlined"
              />
              <TextField
                sx={{ color: "#696969" }}
                label="password"
                name="password"
                value={newUser.password}
                onChange={handleNewUser}
                fullWidth
                size="medium"
                type={showPassword ? "text" : "password"}
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
                variant="contained"
                sx={{
                  display: "flex",
                  margin: "25px auto",
                  width: "55%",
                  height: "45px",
                  fontSize: "1.2rem",
                }}
                onClick={() => setStep(2)}
              >
                Proseguir
              </Button>
            </>
          )}
          {step === 2 && (
            <>
              <TextField
                label="Nome"
                name="firstName"
                fullWidth
                size="medium"
                onChange={handleNewUser}
                value={newUser.firstName}
                sx={{ color: "#696969" }}
                variant="outlined"
              />
              <TextField
                label="Sobrenome"
                name="lastName"
                size="medium"
                onChange={handleNewUser}
                value={newUser.lastName}
                fullWidth
                sx={{ color: "#696969" }}
                variant="outlined"
              />
              <TextField
                label="CRMV"
                name="crmv"
                fullWidth
                onChange={handleNewUser}
                value={newUser.crmv}
                sx={{ color: "#696969" }}
                variant="outlined"
              />
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  variant="outlined"
                  sx={{
                    display: "flex",
                    margin: "25px auto",
                    width: "45%",
                    height: "45px",
                    fontSize: "1.2rem",
                  }}
                  onClick={() => setStep(1)}
                >
                  Voltar
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    display: "flex",
                    margin: "25px auto",
                    width: "45%",
                    height: "45px",
                    fontSize: "1.2rem",
                  }}
                  onClick={() => setStep(3)}
                >
                  Proseguir
                </Button>
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <TextField
                sx={{ color: "#696969" }}
                label="Nome Fantasia"
                name="name"
                size="medium"
                onChange={handleNewClinic}
                value={newClinic.name}
                fullWidth
                variant="outlined"
              />

              <PatternFormat
                format="##.###.###/####-##"
                name="cnpj"
                mask="_"
                value={newClinic.cnpj}
                customInput={TextField}
                size="medium"
                label="CNPJ"
                InputLabelProps={{ shrink: true }}
                onChange={handleNewClinic}
                fullWidth
                sx={{ color: "#696969" }}
                variant="outlined"
              />
              <PatternFormat
                format="(##) #####-####"
                mask="_"
                value={newClinic.telephone}
                customInput={TextField}
                size="medium"
                InputLabelProps={{ shrink: true }}
                onChange={handleNewClinic}
                fullWidth
                sx={{ color: "#696969" }}
                variant="outlined"
                label="Telefone"
                name="telephone"
              />
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  variant="outlined"
                  sx={{
                    display: "flex",
                    margin: "25px auto",
                    width: "45%",
                    height: "45px",
                    fontSize: "1.2rem",
                  }}
                  onClick={() => setStep(2)}
                >
                  Voltar
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    display: "flex",
                    margin: "25px auto",
                    width: "45%",
                    height: "45px",
                    fontSize: "1.2rem",
                  }}
                  onClick={() => setStep(4)}
                >
                  Proseguir
                </Button>
              </div>
            </>
          )}
          {step === 4 && (
            <>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <PatternFormat
                  format="#####-###"
                  InputLabelProps={{ shrink: true }}
                  name="cep"
                  mask="_"
                  onChange={handleAddressChange}
                  value={newClinic.address.cep}
                  customInput={TextField}
                  size="medium"
                  label="CEP"
                  variant="outlined"
                  required
                  style={{ width: "40%" }}
                />
                <TextField
                  label="Rua"
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  name="logradouro"
                  value={newClinic.address?.logradouro}
                  onChange={handleAddressChange}
                  size="medium"
                  required
                  style={{ width: "58%" }}
                />
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <TextField
                  label="Número"
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  name="numero"
                  value={newClinic.address?.numero}
                  onChange={handleAddressChange}
                  size="medium"
                  required
                  style={{ width: "38%" }}
                />

                <TextField
                  label="Bairro"
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  name="bairro"
                  value={newClinic.address.bairro}
                  onChange={handleAddressChange}
                  size="medium"
                  required
                  style={{ width: "60%" }}
                />
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <TextField
                  label="Cidade"
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  name="localidade"
                  value={newClinic.address.localidade}
                  onChange={handleAddressChange}
                  size="medium"
                  required
                  style={{ width: "60%" }}
                />
                <TextField
                  label="Estado"
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  name="uf"
                  value={newClinic.address.uf}
                  onChange={handleAddressChange}
                  size="medium"
                  required
                  style={{ width: "38%" }}
                />
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  variant="outlined"
                  sx={{
                    display: "flex",
                    margin: "25px auto",
                    width: "45%",
                    height: "45px",
                    fontSize: "1.2rem",
                  }}
                  onClick={() => setStep(3)}
                >
                  Voltar
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    display: "flex",
                    margin: "25px auto",
                    width: "45%",
                    height: "45px",
                    fontSize: "1.2rem",
                  }}
                  onClick={handleSave}
                >
                  Cadastrar
                </Button>
              </div>
            </>
          )}
          {step === 1 && (
            <p style={{ textAlign: "center" }}>
              Já possui uma conta?
              <br />
              <Link
                to="/login"
                style={{
                  color: "var(--secondary-400)",
                  textDecoration: "underline",
                }}
              >
                Faça o login
              </Link>
            </p>
          )}
        </FormWrapper>
      </ContentWrapper>
    </PageContainer>
  );
}
