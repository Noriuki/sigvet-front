import { Button, TextField } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import ContentContainer from "../../../Components/ContentContainer";
import { getCurrentUser } from "../../../Services/Auth";
import useUserConfiguration from "../useUserConfiguration";

interface IProps {
  children?: React.ReactNode;
}

const UserInfoTab: React.FC<IProps> = () => {
  const navigate = useNavigate();
  const { userInfo, setUserDataStatus } = useUserConfiguration(null);

  const handleUserEdit = () => {
    setUserDataStatus("edit");
    navigate(`/usuarios/${userInfo.id}`);
  };

  return (
    <ContentContainer
      width="58%"
      height="50%"
      padding="1rem"
      margin="1rem auto"
      alignContent="space-around"
      shadow
    >
      <TextField
        label="Nome"
        name="user_name"
        InputLabelProps={{ shrink: true }}
        variant="outlined"
        size="small"
        disabled
        style={{ width: "68%" }}
        value={`${userInfo?.firstName} ${userInfo?.lastName}`}
      />
      <TextField
        label="Perfil"
        name="user_profile"
        InputLabelProps={{ shrink: true }}
        variant="outlined"
        size="small"
        disabled
        style={{ width: "30%" }}
        value={userInfo?.role}
      />
      <TextField
        label="Email"
        name="user_email"
        InputLabelProps={{ shrink: true }}
        variant="outlined"
        size="small"
        disabled
        style={{ width: "48%" }}
        value={userInfo?.email}
      />
      <TextField
        label="CRMV"
        name="user_crmv"
        InputLabelProps={{ shrink: true }}
        variant="outlined"
        size="small"
        disabled
        style={{ width: "48%" }}
        value={userInfo?.crmv}
      />
      <Button
        style={{ marginLeft: "auto" }}
        variant="contained"
        onClick={handleUserEdit}
      >
        Editar
      </Button>
    </ContentContainer>
  );
};
export default UserInfoTab;
