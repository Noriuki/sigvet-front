import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { Button, InputAdornment, MenuItem, TextField } from "@mui/material";
import { DesktopDateTimePicker } from "@mui/x-date-pickers";
import React from "react";
import { NumericFormat } from "react-number-format";
import { useNavigate, useParams } from "react-router-dom";
import ContentContainer from "../../../Components/ContentContainer";
import ActionButtons from "../../../Components/CustomPanel/ActionButtons";
import CustomRTE from "../../../Components/CustomRTE";
import { EnumStatus, IServiceType } from "../../../Services/Types";
import useAppointmentServiceInfo from "../useAppointmentServiceInfo";
import EmailIcon from "@mui/icons-material/Email";
interface IProps {
  children?: React.ReactNode;
}

const AppointmentServiceInfoTab: React.FC<IProps> = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    appointmentServiceDataStatus,
    appointmentServiceInfo,
    handleInfoChange,
    handleText,
    handleDateChange,
    handleSave,
    templateList,
    handleTemplate,
    template,
    appointmentServiceCategory,
    handleTemplateProduct,
    handleMailService,
  } = useAppointmentServiceInfo(id || null);

  return (
    <form onSubmit={handleSave} style={{ width: "100%", height: "100%" }}>
      {appointmentServiceCategory == "Product" ||
      appointmentServiceCategory == "Petshop" ? (
        <ContentContainer
          padding="1rem"
          flexDirection="column"
          alignContent="center"
        >
          <ContentContainer
            height="48%"
            width="38%"
            padding="1rem"
            alignContent="space-around"
            shadow
          >
            <TextField
              select={appointmentServiceDataStatus === "create"}
              InputLabelProps={{ shrink: true }}
              style={{ width: "100%" }}
              name="template"
              variant="outlined"
              size="small"
              label="Template"
              required
              disabled={appointmentServiceDataStatus !== "create"}
              value={
                appointmentServiceDataStatus === "create"
                  ? template?.id
                  : appointmentServiceInfo?.serviceType?.name
              }
              onChange={handleTemplateProduct}
            >
              {templateList
                .filter((t: any) => t?.category === appointmentServiceCategory)
                .map((template: IServiceType) => (
                  <MenuItem value={template?.id}>{template?.name}</MenuItem>
                ))}
            </TextField>
            <NumericFormat
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">R$</InputAdornment>
                ),
              }}
              decimalScale={2}
              fixedDecimalScale
              customInput={TextField}
              disabled={appointmentServiceDataStatus !== "create"}
              label="Preço"
              key="price"
              name="price"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              size="small"
              value={appointmentServiceInfo?.price}
              onChange={handleInfoChange}
              style={{ width: "100%" }}
            />
          </ContentContainer>
          {appointmentServiceDataStatus !== "view" ? (
            <ActionButtons />
          ) : (
            <ContentContainer justifyContent="end" height="auto">
              <Button
                variant="contained"
                style={{ marginLeft: "auto" }}
                onClick={() => navigate(-1)}
              >
                <KeyboardReturnIcon style={{ marginRight: "1rem" }} /> Voltar
              </Button>
            </ContentContainer>
          )}
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
            <DesktopDateTimePicker
              ampm={false}
              onChange={handleDateChange}
              value={appointmentServiceInfo?.date || null}
              label={
                appointmentServiceCategory == "Exam"
                  ? "Data do exame"
                  : "Data da cirurgia"
              }
              inputFormat="dd/MM/yyyy HH:mm"
              renderInput={(params: any) => (
                <TextField
                  {...params}
                  name="date"
                  type="date"
                  variant="outlined"
                  required
                  InputLabelProps={{ shrink: true }}
                  size="small"
                  style={{ color: "blue", width: "48%" }}
                />
              )}
            />
            <TextField
              label="Situação"
              name="status"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              size="small"
              style={{ width: "48%" }}
              onChange={handleInfoChange}
              value={appointmentServiceInfo?.status}
              select
              required
              disabled={appointmentServiceDataStatus === "view"}
            >
              <MenuItem value={EnumStatus["Aberto"]}>{EnumStatus[0]}</MenuItem>
              <MenuItem value={EnumStatus["Em andamento"]}>
                {EnumStatus[1]}
              </MenuItem>
              <MenuItem value={EnumStatus["Finalizado"]}>
                {EnumStatus[2]}
              </MenuItem>
              <MenuItem value={EnumStatus["Cancelado"]}>
                {EnumStatus[3]}
              </MenuItem>
            </TextField>

            <>
              <TextField
                InputLabelProps={{ shrink: true }}
                style={{ width: "100%" }}
                name="doctor"
                variant="outlined"
                size="small"
                value={`${appointmentServiceInfo?.appointment?.user?.firstName} ${appointmentServiceInfo?.appointment?.user?.lastName}`}
                label="Médico"
                disabled
              />
            </>
            <TextField
              InputLabelProps={{ shrink: true }}
              style={{ width: "60%" }}
              name="patient"
              variant="outlined"
              size="small"
              label="Paciente"
              value={appointmentServiceInfo?.appointment?.animal?.name}
              disabled
            />
            <TextField
              InputLabelProps={{ shrink: true }}
              style={{ width: "38%" }}
              name="appointmentId"
              variant="outlined"
              size="small"
              value={appointmentServiceInfo?.appointment?.id}
              label="Consulta"
              disabled
            />
            <NumericFormat
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">R$</InputAdornment>
                ),
              }}
              decimalScale={2}
              fixedDecimalScale
              customInput={TextField}
              InputLabelProps={{ shrink: true }}
              style={{ width: "48%" }}
              name="price"
              variant="outlined"
              onChange={handleInfoChange}
              required
              disabled={appointmentServiceDataStatus !== "create"}
              size="small"
              label="Preço"
              value={appointmentServiceInfo?.price}
            />

            <TextField
              select={appointmentServiceDataStatus === "create"}
              InputLabelProps={{ shrink: true }}
              style={{ width: "48%" }}
              name="template"
              variant="outlined"
              size="small"
              label="Template"
              required
              disabled={appointmentServiceDataStatus !== "create"}
              value={
                appointmentServiceDataStatus === "create"
                  ? template?.id
                  : appointmentServiceInfo?.serviceType?.name
              }
              onChange={handleTemplate}
            >
              {templateList
                .filter((t: any) => t?.category === appointmentServiceCategory)
                .map((template: IServiceType) => (
                  <MenuItem value={template?.id}>{template?.name}</MenuItem>
                ))}
            </TextField>
          </ContentContainer>
          <div style={{ display: "flex", width: "48%", height: "85%" }}>
            <CustomRTE
              contentCallback={handleText}
              value={appointmentServiceInfo?.notes}
            />
          </div>
          {appointmentServiceDataStatus !== "view" ? (
            <ActionButtons />
          ) : (
            <ContentContainer
              height="auto"
              justifyContent="flex-end"
              borderRadius="0"
            >
              <Button
                variant="contained"
                style={{ marginRight: "10px" }}
                onClick={handleMailService}
              >
                <EmailIcon style={{ marginRight: "1rem" }} /> Enviar Relatório
              </Button>
              <Button variant="contained" onClick={() => navigate(-1)}>
                <KeyboardReturnIcon style={{ marginRight: "1rem" }} /> Voltar
              </Button>
            </ContentContainer>
          )}
        </ContentContainer>
      )}
    </form>
  );
};
export default AppointmentServiceInfoTab;
