import PetsIcon from "@mui/icons-material/Pets";
import { InputAdornment, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import ContentContainer from "../../../../Components/ContentContainer";
import { usePet } from "../../../../Services/Contexts/PetContext";
import { IPet } from "../../../../Services/Types";
import { formatPetAge } from "../../../../Services/Utils";

interface IProps {
  children?: React.ReactNode;
  petInfo?: IPet;
}

const AnimalCard: React.FC<IProps> = ({ petInfo }) => {
  const { loadSelectSpecies, loadSelectRace } = usePet();
  const [speciesName, setSpeciesName] = useState(null);
  const [raceName, setRaceName] = useState(null);

  useEffect(() => {
    loadSelectSpeciesAndRace(
      petInfo?.speciesId as number,
      petInfo?.raceId as number
    );
  }, []);

  const loadSelectSpeciesAndRace = async (
    speciesId: number,
    raceId: number
  ): Promise<any> => {
    const species = await loadSelectSpecies(speciesId);
    const race = await loadSelectRace(raceId);
    setSpeciesName(species);
    setRaceName(race);
  };

  return (
    <ContentContainer
      height="38%"
      padding="1rem"
      shadow
      justifyContent="space-around"
      alignContent="space-around"
    >
      <PetsIcon style={{ fontSize: "5rem", color: "var(--primary-300)" }} />
      <ContentContainer
        width="80%"
        height="100%"
        justifyContent="space-around"
        alignContent="space-around"
      >
        <TextField
          label="Nome"
          name="name"
          value={petInfo?.name}
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          disabled
          size="small"
          style={{ width: "70%" }}
        />
        <TextField
          label="Idade"
          name="age"
          value={petInfo?.age}
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <span>ANO(S)</span>
              </InputAdornment>
            ),
          }}
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          size="small"
          disabled
          style={{ width: "25%" }}
        />
        <TextField
          InputLabelProps={{ shrink: true }}
          label="Espécie"
          name="species"
          value={speciesName}
          variant="outlined"
          size="small"
          disabled
          style={{ width: "55%" }}
        />
        <TextField
          InputLabelProps={{ shrink: true }}
          label="Raça"
          name="race"
          value={raceName}
          variant="outlined"
          size="small"
          disabled
          style={{ width: "40%" }}
        />
      </ContentContainer>
    </ContentContainer>
  );
};
export default AnimalCard;
