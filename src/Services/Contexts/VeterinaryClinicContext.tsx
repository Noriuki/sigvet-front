import React, { createContext, useContext, useEffect, useState } from "react";
import apiService from "../API";
import { clinicRequest } from "../API/endpoints/clinic";
import { getClinicId, getCurrentUser } from "../Auth";
import {
  IAddress,
  IDashboardData,
  IFinanceData,
  IUser,
  IUserSession,
  IVeterinaryClinic,
  TDataStatus,
} from "../Types";

interface IContext {
  userInfo: IUserSession;
  setUserInfo: React.Dispatch<React.SetStateAction<IUserSession>>;
  clinicInfo: IVeterinaryClinic;
  setClinicInfo: React.Dispatch<React.SetStateAction<IVeterinaryClinic>>;
  clinicAddress: IAddress;
  setClinicAddress: React.Dispatch<React.SetStateAction<IAddress>>;
  veterinaryList: IUser[];
  setVeterinaryList: React.Dispatch<React.SetStateAction<IUser[]>>;
  userList: IUser[];
  setUserList: React.Dispatch<React.SetStateAction<IUser[]>>;
  financeData: IFinanceData;
  financeGraphData: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
    }[];
  };
  homeData: IDashboardData;
  homeGraphData: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
    }[];
  };
  userDataStatus: TDataStatus;
  setUserDataStatus: React.Dispatch<React.SetStateAction<TDataStatus>>;
  loadUserList: () => Promise<void>;
}

export const VeterinaryClinicContext = createContext<IContext>({} as IContext);

export function useVeterinary() {
  const context = useContext(VeterinaryClinicContext);
  if (!context) {
    throw new Error(
      "useVeterinary deve ser usado dentro de VeterinaryProvider"
    );
  }

  return context;
}

const labels = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export function VeterinaryClinicProvider(props: any) {
  const { children } = props;

  // CLINIC
  const [clinicInfo, setClinicInfo] = useState<IVeterinaryClinic>({
    address: "",
    cnpj: "",
    email: "",
    name: "",
    telephone: "",
  });

  const [clinicAddress, setClinicAddress] = useState<IAddress>({
    bairro: "",
    cep: "",
    localidade: "",
    logradouro: "",
    numero: "",
    uf: "",
  });
  // USER
  const [userDataStatus, setUserDataStatus] = useState<TDataStatus>("create");
  const [userList, setUserList] = useState<IUser[]>([]);
  const [veterinaryList, setVeterinaryList] = useState<IUser[]>([]);
  const [userInfo, setUserInfo] = useState<IUserSession>({} as IUserSession);

  const loadUserList = async () => {
    const user = getCurrentUser();
    if (user) {
      const clinicId = getClinicId();
      const list = await apiService.get(`/user/all/${clinicId}`);
      if (list) {
        setUserInfo(list.data.result.filter((e: any) => e.id === user.id)[0]);
        setUserList(list.data.result);

        setVeterinaryList(
          list.data.result.filter((u: any) => u.role === "doctor")
        );
      }
    }
  };

  // DATA DISPLAY
  const [financeData, setFinanceData] = useState<IFinanceData>({
    totalRevenueOfMonth: 0,
    averageAppointmentPriceOfMonth: 0,
    averageServicePriceOfMonth: 0,
    averageRevenueOfYear: [],
  });

  const [homeData, setHomeData] = useState<IDashboardData>({
    appointmentsOfMonth: 0,
    animalsOfMonth: 0,
    servicesOfMonth: 0,
    appointmentsOfYear: [],
  });

  const [financeGraphData, setFinanceGraphData] = useState({
    labels,
    datasets: [
      {
        label: "Receita Total",
        data: labels.map(() => 0),
        borderColor: "hsl(159, 86%, 55%)",
        backgroundColor: "hsl(159, 86%, 55%)",
      },
    ],
  });
  const [homeGraphData, setHomeGraphData] = useState({
    labels,
    datasets: [
      {
        label: "Consultas",
        data: labels.map(() => 0),
        borderColor: "hsl(159, 86%, 55%)",
        backgroundColor: "hsl(159, 86%, 55%)",
      },
    ],
  });

  const loadFinanceData = async () => {
    const clinicId = getClinicId();
    if (clinicId) {
      const { result } = await clinicRequest.getFinanceData(clinicId);
      loadFinanceGraphData(result.averageRevenueOfYear);
      setFinanceData(result);
    }
  };

  const loadFinanceGraphData = (dataList: any) => {
    const newGraphData = financeGraphData;
    if (dataList.length > 0) {
      for (const data of dataList) {
        newGraphData.datasets[0].data[data.month - 1] = data.total;
      }
    }
    setFinanceGraphData(newGraphData);
  };
  const loadHomeGraphData = (dataList: any) => {
    const newGraphData = homeGraphData;
    for (let graphData of dataList) {
      newGraphData.datasets[0].data[graphData.month - 1] = Number(
        graphData.appointment_count
      );
    }
    setHomeGraphData(newGraphData);
  };

  const loadHomeData = async () => {
    const clinicId = getClinicId();
    if (clinicId) {
      let { result } = await clinicRequest.getDashboardData(clinicId);
      loadHomeGraphData(result.appointmentsOfYear);
      setHomeData(result);
    }
  };

  useEffect(() => {
    loadClinicInfo();
    loadUserList();
    loadFinanceData();
    loadHomeData();
  }, []);

  const loadClinicInfo = async () => {
    const id = getClinicId();
    if (id) {
      const { result } = await clinicRequest.getClinicInfo(id);
      const address = JSON.parse(result.address);
      setClinicInfo(result);
      setClinicAddress(address);
    }
  };

  return (
    <VeterinaryClinicContext.Provider
      value={{
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
        loadUserList,
      }}
    >
      {children}
    </VeterinaryClinicContext.Provider>
  );
}
