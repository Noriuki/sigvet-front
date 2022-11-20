import MapsHomeWorkOutlinedIcon from "@mui/icons-material/MapsHomeWorkOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import React from "react";
import ContentContainer from "../../Components/ContentContainer";
import CustomPanel from "../../Components/CustomPanel";
import Layout from "../../Layout";
import { ROLE } from "../../Services/Types";
import ClinicInfoTab from "./ClinicInfoTab";
import UserInfoTab from "./UserInfoTab";
import UserManagmentTab from "./UserManagmentTab";
import useUserConfiguration from "./useUserConfiguration";
interface Props {
  children?: React.ReactNode;
}
const UserConfiguration: React.FC<Props> = (props) => {
  const { userInfo } = useUserConfiguration(null);
  const tabsHeader = [
    { icon: <PersonOutlineOutlinedIcon />, label: "usuario" },
    { icon: <MapsHomeWorkOutlinedIcon />, label: "clinica" },
  ];

  const tabsContent = [<UserInfoTab />, <ClinicInfoTab />];

  if (userInfo.role === ("admin" as ROLE)) {
    tabsContent.push(
      <ContentContainer padding="1rem">
        <UserManagmentTab />
      </ContentContainer>
    );
    tabsHeader.push({
      icon: <PeopleAltOutlinedIcon />,
      label: "usuarios-controle",
    });
  }

  return (
    <Layout>
      <CustomPanel tabsHeader={tabsHeader} tabsContent={tabsContent} />
    </Layout>
  );
};
export default UserConfiguration;
