import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, MenuItem, TextField } from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ContentContainer from "../../../Components/ContentContainer";
import ActionButtons from "../../../Components/CustomPanel/ActionButtons";
import Layout from "../../../Layout";
import { ROLE } from "../../../Services/Types";
import useUserConfiguration from "../useUserConfiguration";
interface IProps {
  children?: React.ReactNode;
}

const UserManagementInfo: React.FC<IProps> = (props) => {
  const { id } = useParams();
  const { selectedUserInfo, userDataStatus, handleInfoChange, handleSave } =
    useUserConfiguration(id || null);
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Layout>
      <form onSubmit={handleSave} style={{ width: "100%", height: "100%" }}>
        <ContentContainer padding="1rem" shadow>
          <ContentContainer
            width="50%"
            height="48%"
            padding="8px"
            alignContent="space-around"
          >
            <TextField
              label="Nome"
              InputLabelProps={{ shrink: true }}
              name="firstName"
              onChange={handleInfoChange}
              value={selectedUserInfo.firstName}
              type="text"
              variant="outlined"
              size="small"
              required
              style={{ width: "100%" }}
            />
            <TextField
              label="Sobrenome"
              InputLabelProps={{ shrink: true }}
              name="lastName"
              onChange={handleInfoChange}
              value={selectedUserInfo.lastName}
              type="text"
              variant="outlined"
              size="small"
              required
              style={{ width: "100%" }}
            />
            <TextField
              label="Senha"
              InputLabelProps={{ shrink: true }}
              name="password"
              onChange={handleInfoChange}
              type={showPassword ? "text" : "password"}
              variant="outlined"
              size="small"
              style={{ width: "100%" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((oldState) => !oldState)}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </ContentContainer>

          <ContentContainer
            width="50%"
            height="48%"
            padding="8px"
            alignContent="space-around"
          >
            <TextField
              label="CRMV"
              InputLabelProps={{ shrink: true }}
              name="crmv"
              onChange={handleInfoChange}
              value={selectedUserInfo.crmv}
              type="text"
              variant="outlined"
              size="small"
              style={{ width: "100%" }}
            />
            <TextField
              label="Email"
              InputLabelProps={{ shrink: true }}
              name="email"
              onChange={handleInfoChange}
              value={selectedUserInfo.email}
              type="text"
              variant="outlined"
              size="small"
              required
              style={{ width: "100%" }}
            />

            <TextField
              label="Situação"
              name="active"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              size="small"
              style={{ width: "48%" }}
              onChange={handleInfoChange}
              value={selectedUserInfo?.active as number}
              defaultValue={0}
              required
              select
              disabled={userDataStatus === "view"}
            >
              <MenuItem value={0}>Desativado</MenuItem>
              <MenuItem value={1}>Ativo</MenuItem>
            </TextField>

            <TextField
              label="Cargo"
              name="role"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              size="small"
              style={{ width: "48%" }}
              onChange={handleInfoChange}
              value={selectedUserInfo.role}
              defaultValue={selectedUserInfo.role}
              required
              select
              disabled={userDataStatus === "view"}
            >
              <MenuItem value="receptionist">{ROLE.receptionist}</MenuItem>
              <MenuItem value="doctor">{ROLE.doctor}</MenuItem>
              <MenuItem value="admin">{ROLE.admin}</MenuItem>
            </TextField>
          </ContentContainer>

          {userDataStatus !== "view" && <ActionButtons />}
        </ContentContainer>
      </form>
    </Layout>
  );
};

export default UserManagementInfo;
