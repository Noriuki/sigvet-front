import LogoutIcon from "@mui/icons-material/Logout";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../../Services/Auth";
import { IUserSession } from "../../Services/Types";
interface Props {
  children?: React.ReactNode;
}

const Header: React.FC<Props> = (props) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUserSession | null>(null);

  const loadUser = () => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 0",
        height: "70px",
      }}
    >
      <Link key="logo-sigvet" to="/" style={{ textDecoration: "none" }}>
        <img
          src="/images/logo-sigvet.svg"
          alt="logo-sigvet"
          style={{ height: "50px", margin: "1rem" }}
        />
      </Link>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <p>{`${user?.fullName}`}</p>
        <Button
          key="logout-icon"
          onClick={() => {
            logout();
            navigate("/login");
          }}
          style={{
            textDecoration: "none",
            marginLeft: "1rem",
            paddingRight: "1rem",
          }}
        >
          <LogoutIcon style={{ fontSize: "2rem" }} />
        </Button>
      </div>
    </div>
  );
};
export default Header;
