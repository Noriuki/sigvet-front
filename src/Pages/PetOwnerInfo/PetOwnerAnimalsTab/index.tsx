import React from "react";
import { useParams } from "react-router-dom";
import ContentContainer from "../../../Components/ContentContainer";
import { IPet } from "../../../Services/Types";
import usePetOwnerInfo from "../usePetOwnerInfo";
import AnimalCard from "./AnimalCard";

interface IProps {
  children?: React.ReactNode;
  petList?: IPet[];
}

const PetOwnerAnimalsTab: React.FC<IProps> = (props) => {
  const { id } = useParams();
  const { petList } = usePetOwnerInfo(id as string);

  return (
    <ContentContainer padding="1rem">
      {!!petList?.length && petList.map((pet) => <AnimalCard petInfo={pet} />)}
    </ContentContainer>
  );
};
export default PetOwnerAnimalsTab;
