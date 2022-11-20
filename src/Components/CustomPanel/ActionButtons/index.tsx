import React from "react";
import { useNavigate } from "react-router-dom";
import ContentContainer from "../../ContentContainer";
import { CancelBtn, SaveBtn } from "./styled";

interface IActionButtons {
  cancelAction?: () => void;
  saveAction?: () => void;
}

const ActionButtons: React.FC<IActionButtons> = () => {
  const navigate = useNavigate();
  return (
    <ContentContainer height="10%" justifyContent="end">
      <CancelBtn
        variant="outlined"
        color="secondary"
        onClick={() => navigate(-1)}
      >
        Cancelar
      </CancelBtn>
      <SaveBtn variant="contained" color="secondary" type="submit">
        Salvar
      </SaveBtn>
    </ContentContainer>
  );
};
export default ActionButtons;
