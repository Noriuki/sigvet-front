import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import PetsOutlinedIcon from "@mui/icons-material/PetsOutlined";
import React from "react";
import CustomPanel from "../../Components/CustomPanel";
import Layout from "../../Layout";
import PetOwnerAnimalsTab from "./PetOwnerAnimalsTab";
import PetOwnerInfoTab from "./PetOwnerInfoTab";
interface IProps {
  children?: React.ReactNode;
}

const PetOwnerInfo: React.FC<IProps> = (props) => {
  const tabsHeader = [
    { icon: <PeopleAltOutlinedIcon />, label: "cliente" },
    { icon: <PetsOutlinedIcon />, label: "pets" },
  ];

  const tabsContent = [<PetOwnerInfoTab />, <PetOwnerAnimalsTab />];

  return (
    <Layout>
      <CustomPanel tabsHeader={tabsHeader} tabsContent={tabsContent} />
    </Layout>
  );
};
export default PetOwnerInfo;
