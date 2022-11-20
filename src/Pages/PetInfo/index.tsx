import HourglassEmptyOutlinedIcon from "@mui/icons-material/HourglassEmptyOutlined";
import PetsOutlinedIcon from "@mui/icons-material/PetsOutlined";
import React from "react";
import CustomPanel from "../../Components/CustomPanel";
import Layout from "../../Layout";

import PetHistoryTab from "./PetHistoryTab";
import PetInfoTab from "./PetInfoTab";
interface Props {
  children?: React.ReactNode;
}

const PetInfo: React.FC<Props> = (props) => {
  const tabsHeader = [
    { icon: <PetsOutlinedIcon />, label: "pet" },
    { icon: <HourglassEmptyOutlinedIcon />, label: "historico" },
  ];
  const tabsContent = [<PetInfoTab />, <PetHistoryTab />];
  return (
    <Layout>
      <CustomPanel tabsHeader={tabsHeader} tabsContent={tabsContent} />
    </Layout>
  );
};
export default PetInfo;
