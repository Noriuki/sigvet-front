import React, { createContext, useContext, useEffect, useState } from "react";
import petRequest from "../API/endpoints/pet";
import petOwnerRequest from "../API/endpoints/petOwner";
import raceRequest from "../API/endpoints/race";
import speciesRequest from "../API/endpoints/species";
import { getClinicId } from "../Auth";
import { IPet, TDataStatus } from "../Types";

interface IContext {
  petDataStatus: TDataStatus;
  setPetDataStatus: React.Dispatch<React.SetStateAction<TDataStatus>>;
  petOwnerDataStatus: TDataStatus;
  setPetOwnerDataStatus: React.Dispatch<React.SetStateAction<TDataStatus>>;
  loadPetSelectList: (userID?: number) => Promise<void>;
  loadPetOwnerSelectList: () => Promise<any>;
  speciesList: any[];
  raceList: any[];
  petSelectList: IPet[];
  setPetSelectList: React.Dispatch<React.SetStateAction<IPet[]>>;
  loadSelectSpecies: (speciesId: number) => Promise<any>;
  loadSelectRace: (speciesId: number) => Promise<any>;
  loadSelectPet: (petId: number) => Promise<any>;
}

export const PetContext = createContext<IContext>({} as IContext);

export function usePet() {
  const context = useContext(PetContext);
  if (!context) {
    throw new Error("usePet deve ser usado dentro de PetProvider");
  }

  return context;
}

export function PetProvider(props: any) {
  const { children } = props;

  const [petDataStatus, setPetDataStatus] = useState<TDataStatus>("create");

  const [petOwnerDataStatus, setPetOwnerDataStatus] =
    useState<TDataStatus>("create");

  const [speciesList, setEspeciesList] = useState<any[]>([]);
  const [raceList, setRaceList] = useState<any[]>([]);

  const [petSelectList, setPetSelectList] = useState<IPet[]>([]);

  const loadPetSpeciesRaceList = async () => {
    const clinicId = getClinicId();

    if (clinicId) {
      const petSpeciesList = await speciesRequest.getAll(clinicId);
      const petRaceList = await raceRequest.getAll(clinicId);
      setEspeciesList(petSpeciesList.result);
      setRaceList(petRaceList.result);
    }
  };

  const loadPetSelectList = async (userID?: number): Promise<void> => {
    const clinicId = getClinicId();
    if (clinicId) {
      const petSelectList = await petRequest.getAll(clinicId);

      if (userID) {
        const filtered = petSelectList.result.filter(
          (animal: IPet) => animal.ownerId === userID
        );
        setPetSelectList(filtered);
      }
      setPetSelectList(petSelectList.result);
    }
  };

  const loadSelectSpecies = async (speciesId: number): Promise<any> => {
    try {
      const petSpeciesList = await speciesRequest.get(speciesId);
      return await petSpeciesList.result?.name;
    } catch (err) {
      console.error(err);
    }
  };

  const loadSelectRace = async (speciesId: number): Promise<any> => {
    try {
      const petSpeciesList = await raceRequest.get(speciesId);
      return await petSpeciesList.result?.name;
    } catch (err) {
      console.log(err);
    }
  };

  const loadSelectPet = async (petId: number): Promise<any> => {
    const selectPet = await petRequest.get(petId);

    return selectPet;
  };

  useEffect(() => {
    loadPetSpeciesRaceList();
    loadPetSelectList();
  }, []);

  const loadPetOwnerSelectList = async () => {
    const clinicId = getClinicId();

    if (clinicId) {
      let petOwnerList = await petOwnerRequest.getAll(clinicId);
      petOwnerList = await petOwnerList.result.map((client: any) => {
        return {
          id: client?.id,
          name: `${client?.firstName} ${client?.lastName}`,
        };
      });
      return petOwnerList;
    }
  };

  return (
    <PetContext.Provider
      value={{
        petDataStatus,
        setPetDataStatus,
        petOwnerDataStatus,
        setPetOwnerDataStatus,
        loadPetSelectList,
        loadPetOwnerSelectList,
        speciesList,
        raceList,
        petSelectList,
        setPetSelectList,
        loadSelectSpecies,
        loadSelectRace,
        loadSelectPet,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
