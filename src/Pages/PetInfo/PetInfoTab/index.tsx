import { Button, InputAdornment, MenuItem, TextField } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import ContentContainer from "../../../Components/ContentContainer";
import ActionButtons from "../../../Components/CustomPanel/ActionButtons";
import usePetInfo from "../usePetInfo";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { formatPetAge } from "../../../Services/Utils";
interface IProps {
  children?: React.ReactNode;
}

const PetInfoTab: React.FC<IProps> = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    petDataStatus,
    speciesList,
    raceList,
    petInfo,
    setPetInfo,
    handleInfoChange,
    handleDateChange,
    handleSave,
    petOwnerSelect,
  } = usePetInfo(id || null);

  return (
    <form onSubmit={handleSave} style={{ width: "100%", height: "100%" }}>
      <ContentContainer padding="1rem">
        <ContentContainer
          height="42%"
          width="45%"
          padding="1rem"
          alignContent="space-around"
          shadow
        >
          {petDataStatus === "create" ? (
            <TextField
              select
              InputLabelProps={{ shrink: true }}
              value={petInfo.ownerId}
              onChange={handleInfoChange}
              label="Dono"
              name="ownerId"
              variant="outlined"
              size="small"
              style={{ width: "100%" }}
            >
              {petOwnerSelect.map((e) => (
                <MenuItem key={e.id} value={e.id}>
                  {e.name}
                </MenuItem>
              ))}
            </TextField>
          ) : (
            <TextField
              InputLabelProps={{ shrink: true }}
              value={petInfo.owner?.firstName}
              onChange={handleInfoChange}
              label="Dono"
              name="ownerId"
              disabled={petDataStatus === "view"}
              variant="outlined"
              size="small"
              style={{ width: "100%" }}
            />
          )}

          <TextField
            label="Nome"
            name="name"
            value={petInfo.name}
            InputLabelProps={{ shrink: true }}
            onChange={handleInfoChange}
            variant="outlined"
            size="small"
            disabled={petDataStatus === "view"}
            style={{ width: "100%" }}
          />
        </ContentContainer>

        <ContentContainer
          height="42%"
          width="50%"
          padding="1rem"
          alignContent="space-around"
          shadow
        >
          <DesktopDatePicker
            onChange={handleDateChange}
            value={petInfo.birthDate || null}
            label="Data de Nascimento"
            inputFormat="dd/MM/yyyy"
            disabled={petDataStatus === "view"}
            renderInput={(params: any) => (
              <TextField
                {...params}
                name="birthdate"
                type="date"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                size="small"
                style={{ color: "blue", width: "55%" }}
              />
            )}
          />
          <TextField
            label="Idade"
            name="age"
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">ANO(S)</InputAdornment>
              ),
            }}
            value={petInfo?.age as number}
            type="number"
            disabled={petDataStatus === "view"}
            inputProps={{
              maxLength: 99,
              step: "0.1",
            }}
            onChange={handleInfoChange}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            size="small"
            style={{ width: "42%" }}
          />
          <TextField
            select
            disabled={petDataStatus === "view"}
            InputLabelProps={{ shrink: true }}
            value={petInfo.speciesId}
            onChange={handleInfoChange}
            label="Espécie"
            name="speciesId"
            variant="outlined"
            size="small"
            style={{ width: "55%" }}
          >
            {speciesList.map((species) => (
              <MenuItem key={species.id} value={species.id}>
                {species.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            disabled={petDataStatus === "view"}
            InputLabelProps={{ shrink: true }}
            value={petInfo.raceId}
            onChange={handleInfoChange}
            label="Raça"
            name="raceId"
            variant="outlined"
            size="small"
            style={{ width: "40%" }}
          >
            {raceList.map((race) => {
              if (race.speciesId === petInfo.speciesId) {
                return (
                  <MenuItem key={race.id} value={race.id}>
                    {race.name}
                  </MenuItem>
                );
              }
            })}
          </TextField>
        </ContentContainer>

        <ContentContainer
          height="40%"
          padding="1rem"
          alignContent="space-around"
          shadow
        >
          <TextField
            disabled={petDataStatus === "view"}
            InputLabelProps={{ shrink: true }}
            style={{ width: "28%" }}
            name="size"
            variant="outlined"
            size="small"
            value={petInfo.size || ""}
            label="Porte"
            onChange={handleInfoChange}
            select
          >
            <MenuItem value="small">Pequeno</MenuItem>
            <MenuItem value="medium">Médio</MenuItem>
            <MenuItem value="large">Grande</MenuItem>
          </TextField>
          <TextField
            label="Sexo"
            name="sex"
            disabled={petDataStatus === "view"}
            variant="outlined"
            size="small"
            select
            value={petInfo.sex || ""}
            onChange={handleInfoChange}
            InputLabelProps={{ shrink: true }}
            style={{ width: "28%" }}
          >
            <MenuItem value="M">Macho</MenuItem>
            <MenuItem value="F">Fêmea</MenuItem>
          </TextField>
          <TextField
            label="Pelagem"
            disabled={petDataStatus === "view"}
            value={petInfo.fur}
            name="fur"
            onChange={handleInfoChange}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            size="small"
            style={{ width: "28%" }}
          />
          <TextField
            select
            label="Esterilizado"
            name="castrated"
            variant="outlined"
            size="small"
            disabled={petDataStatus === "view"}
            value={petInfo.castrated}
            InputLabelProps={{ shrink: true }}
            style={{ width: "28%" }}
            onChange={handleInfoChange}
          >
            <MenuItem value={1}>Sim</MenuItem>
            <MenuItem value={0}>Não</MenuItem>
          </TextField>
        </ContentContainer>
        {petDataStatus !== "view" ? (
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
export default PetInfoTab;
