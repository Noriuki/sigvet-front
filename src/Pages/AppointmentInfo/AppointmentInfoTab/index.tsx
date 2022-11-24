import { KeyboardReturn as KeyboardReturnIcon } from "@mui/icons-material";
import { Button, InputAdornment, MenuItem, TextField } from "@mui/material";
import { DesktopDateTimePicker } from "@mui/x-date-pickers";
import React from "react";
import { NumericFormat } from "react-number-format";
import { useNavigate, useParams } from "react-router-dom";
import ContentContainer from "../../../Components/ContentContainer";
import ActionButtons from "../../../Components/CustomPanel/ActionButtons";
import CustomRTE from "../../../Components/CustomRTE";
import { EnumStatus } from "../../../Services/Types";
import useAppointmentInfo from "../useAppointmentInfo";
interface IProps {
  children?: React.ReactNode;
}

const AppointmentInfoTab: React.FC<IProps> = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    appointmentDataStatus,
    veterinaryList,
    petSelectList,
    appointmentInfo,
    handleText,
    handleInfoChange,
    handleDateChange,
    handleSave,
  } = useAppointmentInfo(id || null);
  return (
    <form onSubmit={handleSave} style={{ width: "100%", height: "100%" }}>
      <ContentContainer padding="1rem">
        <ContentContainer
          padding="1rem"
          height="85%"
          width="48%"
          justifyContent="space-around"
          alignContent="space-around"
          shadow
        >
          <DesktopDateTimePicker
            ampm={false}
            onChange={handleDateChange}
            value={appointmentInfo.date || null}
            label="Data da consulta"
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
                disabled={appointmentDataStatus === "view"}
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
            value={appointmentInfo.status}
            required
            select
            disabled={appointmentDataStatus === "view"}
          >
            <MenuItem value="0">{EnumStatus[0]}</MenuItem>
            <MenuItem value="1">{EnumStatus[1]}</MenuItem>
            <MenuItem value="2">{EnumStatus[2]}</MenuItem>
          </TextField>

          <TextField
            label="Motivo da consulta"
            name="topic"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            size="small"
            style={{ width: "100%" }}
            value={appointmentInfo.topic}
            onChange={handleInfoChange}
            required
            disabled={appointmentDataStatus === "view"}
          />

          <>
            <TextField
              select
              InputLabelProps={{ shrink: true }}
              style={{ width: "100%" }}
              name="userId"
              variant="outlined"
              size="small"
              label="Médico"
              required
              value={appointmentInfo.userId}
              onChange={handleInfoChange}
            >
              {veterinaryList.map((e) => (
                <MenuItem
                  key={e.id}
                  value={e.id}
                >{`${e.firstName} ${e.lastName}`}</MenuItem>
              ))}
            </TextField>
            <TextField
              select
              InputLabelProps={{ shrink: true }}
              style={{ width: "100%" }}
              name="animalId"
              variant="outlined"
              size="small"
              label="Paciente"
              required
              onChange={handleInfoChange}
              value={appointmentInfo?.animalId}
            >
              {petSelectList.map((e) => (
                <MenuItem key={e.id} value={e.id}>{`${e.name}`}</MenuItem>
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
              disabled={appointmentDataStatus !== "create"}
              label="Preço"
              key="base_price"
              name="base_price"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              size="small"
              value={
                appointmentDataStatus !== "create"
                  ? appointmentInfo?.price
                  : appointmentInfo?.base_price
              }
              onChange={handleInfoChange}
              style={{ width: "100%" }}
            />
          </>
        </ContentContainer>

        <div style={{ display: "flex", width: "48%", height: "85%" }}>
          <CustomRTE
            disabled={appointmentDataStatus === "view"}
            contentCallback={handleText}
            value={appointmentInfo.notes || ""}
          />
        </div>

        {appointmentDataStatus !== "view" ? (
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
export default AppointmentInfoTab;
