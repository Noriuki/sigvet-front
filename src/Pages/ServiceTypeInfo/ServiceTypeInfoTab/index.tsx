import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { Button, InputAdornment, TextField } from "@mui/material";
import React from "react";
import { NumericFormat } from "react-number-format";
import { useNavigate, useParams } from "react-router-dom";
import ContentContainer from "../../../Components/ContentContainer";
import ActionButtons from "../../../Components/CustomPanel/ActionButtons";
import CustomRTE from "../../../Components/CustomRTE";
import useServiceType from "../useServiceType";
interface IProps {
  children?: React.ReactNode;
}

const ServiceTypeInfoTab: React.FC<IProps> = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    serviceTypeCategory,
    serviceTypeDataStatus,
    serviceTypeInfo,
    handleInfoChange,
    handleText,
    handleSave,
  } = useServiceType(id as string);

  return (
    <form onSubmit={handleSave} style={{ width: "100%", height: "100%" }}>
      {serviceTypeCategory == "Product" || serviceTypeCategory == "Petshop" ? (
        <ContentContainer flexDirection="column" padding="1rem">
          <ContentContainer
            height="48%"
            width="38%"
            padding="1rem"
            alignContent="space-around"
            shadow
          >
            <TextField
              disabled={serviceTypeDataStatus === "view"}
              label={serviceTypeCategory == "Product" ? "Produto" : "Serviço"}
              name="name"
              key="name"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              size="small"
              onChange={handleInfoChange}
              style={{ width: "100%" }}
            />

            <NumericFormat
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">R$</InputAdornment>
                ),
                size: "small",
              }}
              decimalScale={2}
              fixedDecimalScale
              customInput={TextField}
              disabled={serviceTypeDataStatus === "view"}
              label="Preço"
              key="price"
              name="defaultPrice"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              size="small"
              onChange={handleInfoChange}
              style={{ width: "100%", height: "1.4375em" }}
            />
          </ContentContainer>
          {serviceTypeDataStatus !== "view" && <ActionButtons />}
        </ContentContainer>
      ) : (
        <ContentContainer padding="1rem">
          <ContentContainer
            height="48%"
            width="48%"
            padding="1rem"
            alignContent="space-around"
            shadow
          >
            <TextField
              disabled={serviceTypeDataStatus === "view"}
              InputLabelProps={{ shrink: true }}
              key="name"
              style={{ width: "100%" }}
              name="name"
              variant="outlined"
              size="small"
              label={
                serviceTypeCategory == "Cirurgy"
                  ? "Nome da cirurgia"
                  : "Nome do exame"
              }
              value={serviceTypeInfo.name}
              onChange={handleInfoChange}
            />

            <NumericFormat
              decimalScale={2}
              fixedDecimalScale
              customInput={TextField}
              disabled={serviceTypeDataStatus === "view"}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">R$</InputAdornment>
                ),
              }}
              style={{ width: "100%" }}
              key="price"
              name="defaultPrice"
              variant="outlined"
              size="small"
              label="Preço base"
              onChange={handleInfoChange}
              value={serviceTypeInfo.defaultPrice}
            />
          </ContentContainer>

          <div style={{ display: "flex", width: "48%", height: "85%" }}>
            <CustomRTE
              disabled={serviceTypeDataStatus === "view"}
              contentCallback={handleText}
              value={serviceTypeInfo.notes}
            />
          </div>

          {serviceTypeDataStatus !== "view" ? (
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
      )}
    </form>
  );
};
export default ServiceTypeInfoTab;
