import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import userRequest from "../../Services/API/endpoints/user";
import { getClinicId } from "../../Services/Auth";
import { useVeterinary } from "../../Services/Contexts/VeterinaryClinicContext";
import { IUser, ROLE } from "../../Services/Types";

const useUserConfiguration = (id: string | null) => {
  const navigate = useNavigate();
  const {
    userInfo,
    setUserInfo,
    clinicInfo,
    setClinicInfo,
    clinicAddress,
    setClinicAddress,
    veterinaryList,
    setVeterinaryList,
    userList,
    setUserList,
    financeData,
    financeGraphData,
    homeData,
    homeGraphData,
    userDataStatus,
    setUserDataStatus,
  } = useVeterinary();
  // USER
  const [selectedUserInfo, setSelectedUserInfo] = useState<IUser>({
    clinicId: getClinicId(),
    firstName: "",
    lastName: "",
    email: "",
    role: ROLE.receptionist,
    crmv: "",
    active: 1,
  });

  /* load data */
  useEffect(() => {
    if (userDataStatus !== "create") {
      loadUser();
    }
    return () => resetUserInfo();
  }, []);

  const loadUser = async () => {
    const res = await userRequest.get(parseInt(id as string));

    setSelectedUserInfo({
      ...res.result,
    });
  };

  /* edit data */
  const handleInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setSelectedUserInfo((oldState: any) => ({ ...oldState, [name]: value }));
  };

  const resetUserInfo = () => {
    setSelectedUserInfo({
      clinicId: getClinicId(),
      firstName: "",
      lastName: "",
      email: "",
      role: ROLE.receptionist,
      crmv: "",
      active: 1,
    });
  };

  /* save data */
  const handleSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const postBody = {
      ...selectedUserInfo,
    };
    if (userDataStatus === "create") {
      const res = await userRequest.create(postBody);

      if (res.success === true) {
        Swal.fire({
          icon: "success",
          title: "Adicionado com sucesso!",
          text: "Cliente cadastrado.",
        });
      }
    } else if (userDataStatus === "edit") {
      const res = await userRequest.update(parseInt(id as string), postBody);

      if (res.success === true) {
        Swal.fire({
          icon: "success",
          title: "Atualizado com sucesso!",
          text: "Cliente atualizado.",
        });
      }
    }
    navigate(-1);
  };

  return {
    userInfo,
    setUserDataStatus,
    userDataStatus,
    handleInfoChange,
    handleSave,
    clinicInfo,
    clinicAddress,
    selectedUserInfo,
    setSelectedUserInfo,
    userList,
  };
};
export default useUserConfiguration;
