import HealingOutlinedIcon from "@mui/icons-material/HealingOutlined";
import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";
import SpaIcon from "@mui/icons-material/Spa";
import VaccinesOutlinedIcon from "@mui/icons-material/VaccinesOutlined";
import { TimelineContent } from "@mui/lab";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { GridExpandMoreIcon } from "@mui/x-data-grid";
import React from "react";
interface IProps {
  children?: React.ReactNode;
  itemType: "Exam" | "Cirurgy" | "Product" | "Petshop";
  itemHeader: string;
  itemBody: string;
}

const CustomTimeLineItem: React.FC<IProps> = ({
  itemType,
  itemHeader,
  itemBody,
}) => {
  return (
    <TimelineItem
      position="right"
      style={{ minHeight: "auto", marginBottom: "2rem" }}
    >
      <TimelineSeparator>
        <TimelineDot color="secondary">
          {itemType === "Exam" && (
            <ScienceOutlinedIcon style={{ fontSize: "2rem" }} />
          )}
          {itemType === "Cirurgy" && (
            <HealingOutlinedIcon style={{ fontSize: "2rem" }} />
          )}
          {itemType === "Product" && (
            <VaccinesOutlinedIcon style={{ fontSize: "2rem" }} />
          )}
          {itemType === "Petshop" && <SpaIcon style={{ fontSize: "2rem" }} />}
        </TimelineDot>
      </TimelineSeparator>
      <TimelineContent>
        <Accordion>
          <AccordionSummary
            expandIcon={<GridExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{itemHeader}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div dangerouslySetInnerHTML={{ __html: itemBody }} />
          </AccordionDetails>
        </Accordion>
      </TimelineContent>
    </TimelineItem>
  );
};
export default CustomTimeLineItem;
