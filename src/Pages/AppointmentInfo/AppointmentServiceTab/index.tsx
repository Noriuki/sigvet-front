import Timeline from "@mui/lab/Timeline";
import React from "react";
import ContentContainer from "../../../Components/ContentContainer";
import CustomTimeLineItem from "../../../Components/CustomTimeLineItem";

interface IProps {
  children?: React.ReactNode;
  serviceList?: any[];
}

const AppointmentServiceTab: React.FC<IProps> = ({ serviceList }) => {
  return (
    <ContentContainer padding="1rem">
      <ContentContainer padding="1rem" width="100%">
        <Timeline
          sx={{
            maxHeight: "100%",
            overflow: "auto",
            height: "100%",
            padding: "0",
            margin: "0",
            justifyContent: "start",
          }}
        >
          {!!serviceList?.length &&
            serviceList.map((service) => (
              <CustomTimeLineItem
                key={service.id}
                itemType={service?.serviceType.category}
                itemHeader={service?.serviceType.name}
                itemBody={service.notes || "Sem anotações..."}
              />
            ))}
        </Timeline>
      </ContentContainer>
    </ContentContainer>
  );
};
export default AppointmentServiceTab;
