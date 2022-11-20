import { Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface IPanelProps {
  tabsHeader: { icon: any; label: string }[];
  tabsContent: React.ReactNode[];
}
interface ITabPanelProps {
  children?: React.ReactNode;
  tabIndex: number;
  value: number;
}

function TabPanel(props: ITabPanelProps) {
  const { children, tabIndex, value, ...other } = props;
  const uuid = uuidv4();
  return (
    <div
      role="tabpanel"
      style={{ width: "100%", height: "calc(100% - 50px)" }}
      hidden={value !== tabIndex}
      id={`panel-tab-${uuid}`}
      aria-labelledby={`panel-tab-${uuid}`}
      {...other}
    >
      {value === tabIndex && <>{children}</>}
    </div>
  );
}

const CustomPanel: React.FC<IPanelProps> = (props) => {
  const { tabsHeader, tabsContent } = props;
  const [tabSelected, setTabSeletected] = useState(0);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setTabSeletected(newValue);
  };

  return (
    <div
      key="custom-panel"
      style={{
        width: "100%",
        height: "100%",
        margin: "auto",
        maxWidth: "1500px",
        display: "flex",
        flexDirection: "column",
        boxShadow: "var(--dark-shadow)",
        borderRadius: "10px",
        border: "none",
        overflow: "auto",
      }}
    >
      <Tabs
        value={tabSelected}
        onChange={handleChangeTab}
        style={{
          border: "none",
        }}
      >
        {tabsHeader.map((tab) => {
          const uuid = uuidv4();
          return (
            <Tab
              color="#fff"
              icon={tab.icon}
              key={uuid}
              aria-label={tab.label}
            />
          );
        })}
      </Tabs>
      {tabsContent.map((tabContent, index) => {
        const uuid = uuidv4();
        return (
          <TabPanel value={tabSelected} key={uuid} tabIndex={index}>
            {tabContent}
          </TabPanel>
        );
      })}
    </div>
  );
};
export default CustomPanel;
