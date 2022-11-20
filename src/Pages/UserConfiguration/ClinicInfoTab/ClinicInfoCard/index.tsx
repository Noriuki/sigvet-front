import { TextField } from "@mui/material";
import React from "react";
import { PatternFormat } from "react-number-format";
import ContentContainer from "../../../../Components/ContentContainer";
import { IAddress, IVeterinaryClinic } from "../../../../Services/Types";
interface IProps {
  children?: React.ReactNode;
  clinicInfo: IVeterinaryClinic;
  clinicAddress: IAddress;
}

const ClinicInfoCard: React.FC<IProps> = ({ clinicInfo, clinicAddress }) => {
  return (
    <ContentContainer padding="1rem">
      <ContentContainer
        height="48%"
        padding="1rem"
        alignContent="space-around"
        justifyContent="space-around"
        shadow
      >
        <TextField
          label="Nome da empresa"
          name="clinic_name"
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          size="small"
          disabled
          style={{ width: "48%" }}
          value={clinicInfo.name}
        />
        <TextField
          label="CPF / CNPJ"
          name="clinic_document"
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          size="small"
          disabled
          style={{ width: "48%" }}
          value={clinicInfo.cnpj}
        />
        <TextField
          label="Telefone"
          name="clinic_phone"
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          size="small"
          disabled
          style={{ width: "48%" }}
          value={clinicInfo.telephone}
        />
        <TextField
          label="Email"
          name="clinic_email"
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          size="small"
          disabled
          style={{ width: "48%" }}
          value={clinicInfo.email}
        />
      </ContentContainer>
      <ContentContainer
        height="48%"
        padding="1rem"
        alignContent="space-around"
        justifyContent="space-around"
        shadow
      >
        <ContentContainer
          height="50%"
          alignContent="space-around"
          justifyContent="space-around"
        >
          <PatternFormat
            format="#####-###"
            InputLabelProps={{ shrink: true }}
            name="cep"
            mask="_"
            customInput={TextField}
            size="small"
            disabled
            label="CEP"
            variant="outlined"
            style={{ width: "40%" }}
            value={clinicAddress.cep}
          />
          <TextField
            label="Rua"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            name="logradouro"
            size="small"
            disabled
            style={{ width: "40%" }}
            value={clinicAddress.logradouro}
          />
          <TextField
            label="Número"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            name="numero"
            size="small"
            disabled
            style={{ width: "16%" }}
            value={clinicAddress.numero}
          />
        </ContentContainer>

        <ContentContainer
          height="50%"
          alignContent="space-around"
          justifyContent="space-around"
        >
          <TextField
            label="Bairro"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            name="bairro"
            size="small"
            disabled
            style={{ width: "40%" }}
            value={clinicAddress.bairro}
          />
          <TextField
            label="Cidade"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            name="localidade"
            size="small"
            disabled
            style={{ width: "40%" }}
            value={clinicAddress.localidade}
          />
          <TextField
            label="Estado"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            name="uf"
            size="small"
            disabled
            style={{ width: "16%" }}
            value={clinicAddress.uf}
          />
        </ContentContainer>
      </ContentContainer>
    </ContentContainer>
  );
};
export default ClinicInfoCard;
