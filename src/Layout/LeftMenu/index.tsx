import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MedicalServicesOutlinedIcon from "@mui/icons-material/MedicalServicesOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import PetsOutlinedIcon from "@mui/icons-material/PetsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import WorkHistoryOutlinedIcon from "@mui/icons-material/WorkHistoryOutlined";
import { ListItemIcon } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import React from "react";
import { Link } from "react-router-dom";
import { useApp } from "../../Services/Contexts/AppContext";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
interface Props {
  children?: React.ReactNode;
}

const MenuItems = [
  {
    text: "Home",
    icon: <HomeOutlinedIcon style={{ color: "#fff", fontSize: 36 }} />,
    route: "/",
  },
  {
    text: "Clientes",
    icon: <PeopleAltOutlinedIcon style={{ color: "#fff", fontSize: 36 }} />,
    route: "/clientes",
  },
  {
    text: "Animais",
    icon: <PetsOutlinedIcon style={{ color: "#fff", fontSize: 36 }} />,
    route: "/animais",
  },
  {
    text: "Consultas",
    icon: (
      <MedicalServicesOutlinedIcon style={{ color: "#fff", fontSize: 36 }} />
    ),
    route: "/consultas",
  },
  {
    text: "Serviços",
    icon: <WorkHistoryOutlinedIcon style={{ color: "#fff", fontSize: 36 }} />,
    route: "/servicos",
  },
  {
    text: "Tipo Serviço",
    icon: (
      <DriveFolderUploadOutlinedIcon style={{ color: "#fff", fontSize: 36 }} />
    ),
    route: "/tipo-servico",
  },
  {
    text: "Financeiro",
    icon: <PaidOutlinedIcon style={{ color: "#fff", fontSize: 36 }} />,
    route: "/financeiro",
  },
  {
    text: "Configurações",
    icon: (
      <SettingsOutlinedIcon
        color="primary"
        style={{ color: "#fff", fontSize: 36 }}
      />
    ),
    route: "/configuracoes",
  },
];

const LeftMenu: React.FC<Props> = (props) => {
  const { selectedIndexMenu, setSelectedIndexMenu } = useApp();

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndexMenu(index);
  };

  return (
    <List
      style={{
        backgroundColor: "var(--primary-300)",
        borderRadius: "0px 5px 5px 0px",
        height: "calc(100% - 1rem)",
        display: "flex",
        width: "90px",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: "var(--dark-shadow)",
        padding: "1rem 0",
      }}
    >
      {MenuItems.map((item, index: number) => (
        <Link
          style={{
            backgroundColor:
              selectedIndexMenu === index
                ? "var(--primary-400)"
                : "var(--primary-300)",
            textDecoration: "none",
          }}
          key={item.text}
          to={item.route}
        >
          <ListItem
            onClick={(event) => handleListItemClick(event, index)}
            button
            key={item.text}
          >
            <ListItemIcon
              style={{ justifyContent: "center" }}
              about={item.text}
            >
              {item.icon}
            </ListItemIcon>
          </ListItem>
        </Link>
      ))}
    </List>
  );
};
export default LeftMenu;
