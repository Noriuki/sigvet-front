import Timeline from "@mui/lab/Timeline";
import React from "react";
import { useParams } from "react-router-dom";
import ContentContainer from "../../../Components/ContentContainer";
import CustomTimeLineItem from "../../../Components/CustomTimeLineItem";
import usePetInfo from "../usePetInfo";

interface IProps {
  children?: React.ReactNode;
}

const PetHistoryTab: React.FC<IProps> = () => {
  const { id } = useParams();
  const { serviceList } = usePetInfo(id || null);

  return (
    <ContentContainer margin="0" justifyContent="center" padding="1rem">
      <ContentContainer
        width="80%"
        margin="0"
        padding="1rem"
        justifyContent="center"
      >
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
                itemType={service?.serviceType_category}
                itemHeader={service?.serviceType_name}
                itemBody={service.service_notes || "Sem anotações..."}
              />
            ))}
        </Timeline>
      </ContentContainer>
    </ContentContainer>
  );
};
export default PetHistoryTab;
