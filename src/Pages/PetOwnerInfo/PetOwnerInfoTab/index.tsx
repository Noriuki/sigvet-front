import { Button, TextField } from "@mui/material";
import React, { FormEvent } from "react";
import { PatternFormat } from "react-number-format";
import { useNavigate, useParams } from "react-router-dom";
import ContentContainer from "../../../Components/ContentContainer";
import ActionButtons from "../../../Components/CustomPanel/ActionButtons";
import { IPetOwner, TDataStatus } from "../../../Services/Types";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import usePetOwnerInfo from "../usePetOwnerInfo";
interface IProps {
  children?: React.ReactNode;
}

const PetOwnerInfoTab: React.FC<IProps> = (props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    petOwnerDataStatus,
    petOwnerInfo,
    handleSave,
    handleInfoChange,
    handleAddressChange,
  } = usePetOwnerInfo(id as string);
  return (
    <form onSubmit={handleSave} style={{ width: "100%", height: "100%" }}>
      <ContentContainer padding="1rem">
        <ContentContainer
          height="42%"
          width="48%"
          shadow
          padding="8px"
          alignContent="space-around"
        >
          <TextField
            label="Nome"
            InputLabelProps={{ shrink: true }}
            name="firstName"
            onChange={handleInfoChange}
            value={petOwnerInfo.firstName}
            type="text"
            variant="outlined"
            size="small"
            required
            style={{ width: "100%" }}
          />
          <TextField
            label="Sobrenome"
            InputLabelProps={{ shrink: true }}
            name="lastName"
            onChange={handleInfoChange}
            value={petOwnerInfo.lastName}
            type="text"
            variant="outlined"
            size="small"
            required
            style={{ width: "100%" }}
          />
          <PatternFormat
            format="###.###.###-##"
            name="cpf"
            onChange={handleInfoChange}
            mask="_"
            value={petOwnerInfo.cpf}
            customInput={TextField}
            size="small"
            label="CPF"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            required
            style={{ width: "100%" }}
          />
        </ContentContainer>

        <ContentContainer
          height="42%"
          width="48%"
          padding="8px"
          alignContent="space-around"
          shadow
        >
          <PatternFormat
            format="(##) #####-####"
            InputLabelProps={{ shrink: true }}
            name="cellphone"
            onChange={handleInfoChange}
            value={petOwnerInfo.cellphone}
            mask="_"
            customInput={TextField}
            size="small"
            label="Celular"
            variant="outlined"
            required
            style={{ width: "48%" }}
          />
          <PatternFormat
            format="(##) ####-####"
            InputLabelProps={{ shrink: true }}
            name="telephone"
            onChange={handleInfoChange}
            value={petOwnerInfo.telephone}
            mask="_"
            customInput={TextField}
            size="small"
            label="Telefone"
            variant="outlined"
            style={{ width: "48%" }}
          />
          <TextField
            label="Email"
            type="email"
            name="email"
            onChange={handleInfoChange}
            InputLabelProps={{ shrink: true }}
            value={petOwnerInfo.email}
            variant="outlined"
            size="small"
            style={{ width: "100%" }}
          />
        </ContentContainer>

        <ContentContainer
          height="42%"
          padding="8px"
          alignContent="space-around"
          shadow
        >
          <ContentContainer height="50%" alignContent="center">
            <PatternFormat
              format="#####-###"
              InputLabelProps={{ shrink: true }}
              name="cep"
              mask="_"
              onChange={handleAddressChange}
              value={petOwnerInfo.address?.cep}
              customInput={TextField}
              size="small"
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
              value={petOwnerInfo.address?.logradouro}
              onChange={handleAddressChange}
              size="small"
              required
              style={{ width: "40%" }}
            />
            <TextField
              label="Número"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              name="numero"
              value={petOwnerInfo.address?.numero}
              onChange={handleAddressChange}
              size="small"
              required
              style={{ width: "16%" }}
            />
          </ContentContainer>

          <ContentContainer height="50%" alignContent="center">
            <TextField
              label="Bairro"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              name="bairro"
              value={petOwnerInfo.address.bairro}
              onChange={handleAddressChange}
              size="small"
              required
              style={{ width: "40%" }}
            />
            <TextField
              label="Cidade"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              name="localidade"
              value={petOwnerInfo.address.localidade}
              onChange={handleAddressChange}
              size="small"
              required
              style={{ width: "40%" }}
            />
            <TextField
              label="Estado"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              name="uf"
              value={petOwnerInfo.address.uf}
              onChange={handleAddressChange}
              size="small"
              required
              style={{ width: "16%" }}
            />
          </ContentContainer>
        </ContentContainer>
        {petOwnerDataStatus !== "view" ? (
          <ActionButtons />
        ) : (
          <Button
            variant="contained"
            style={{ marginLeft: "auto" }}
            onClick={() => navigate(-1)}
          >
            <KeyboardReturnIcon style={{ marginRight: "1rem" }} /> Voltar
          </Button>
        )}
      </ContentContainer>
    </form>
  );
};

export default PetOwnerInfoTab;
