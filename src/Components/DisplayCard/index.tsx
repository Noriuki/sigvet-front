import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import React from "react";
import ContentContainer from "../ContentContainer";
interface IDisplayCard {
  children?: React.ReactNode;

  title: string;
  value: string | number;
}

export default function DisplayCard(props: IDisplayCard) {
  return (
    <ContentContainer
      height="100%"
      width="20%"
      alignContent="space-around"
      shadow
      overflow="visible"
      padding="15px"
    >
      <h5
        style={{
          fontSize: "1.2rem",
          width: "100%",
          margin: "10px 0",
          textAlign: "left",
          color: "var(--primary-400)",
          fontFamily: "var(--secondary-font)",
        }}
      >
        {props.title}
      </h5>
      <h5
        style={{
          fontSize: "1.8rem",
          width: "100%",
          margin: "10px 0",
          textAlign: "left",
          color: "var(--titles)",
          fontFamily: "var(--secondary-font)",
        }}
      >
        {props.value}
      </h5>
    </ContentContainer>
  );
}
