import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { IconButton } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import DataGrid from "../../../Components/DataGrid";
import appointmentRequest from "../../../Services/API/endpoints/appointment";
import appointmentServiceRequest from "../../../Services/API/endpoints/appointmentService";
import { getClinicId } from "../../../Services/Auth";
import { useAppointment } from "../../../Services/Contexts/AppointmentContext";
import {
  EnumStatus,
  IAppointmentService,
  IServiceType,
} from "../../../Services/Types";
import { formatCurrency } from "../../../Services/Utils";
const columns = (
  handleViewCallback: (id: number) => void,
  handleEditCallback: (id: number) => void,
  handleDeleteCallback: (id: number) => void,
  templateList: IServiceType[]
): GridColDef[] => {
  return [
    {
      field: "id",
      headerName: "Id",
      flex: 1,
    },
    {
      field: "appointmentId",
      headerName: "Consulta",
      renderCell: (params: GridRenderCellParams<any, any, any>) => {
        return <span>{params.row.appointment?.id}</span>;
      },
      flex: 1,
    },
    {
      field: "serviceTypeId",
      headerName: "Tipo",
      renderCell: (params: GridRenderCellParams<any, any, any>) => {
        const selectedTemplate = templateList.find(
          (e: IServiceType) => e?.id === params.value
        ) as IServiceType;
        return <span>{selectedTemplate?.name}</span>;
      },
      flex: 1,
    },
    {
      field: "price",
      headerName: "Preço",
      flex: 1,
      renderCell: (params: GridRenderCellParams<any, any, any>) => {
        return <span>{formatCurrency(params.row.price)}</span>;
      },
    },
    {
      field: "status",
      headerName: "Situação",
      renderCell: (params: GridRenderCellParams<any, any, any>) => {
        const status = params.value as EnumStatus;
        return <span>{EnumStatus[status]}</span>;
      },
      width: 150,
    },
    {
      field: "view",
      headerName: "Visualizar",
      sortable: false,
      renderCell: (params: GridRenderCellParams<any, any, any>) => {
        const handleView = (e: any) => {
          e.stopPropagation();
          handleViewCallback(params.row?.id);
        };
        return (
          <IconButton onClick={handleView} aria-label="view">
            <VisibilityIcon />
          </IconButton>
        );
      },
      width: 100,
    },
    {
      field: "edit",
      headerName: "Editar",
      sortable: false,
      renderCell: (params: GridRenderCellParams<any, any, any>) => {
        const handleEdit = (e: any) => {
          e.stopPropagation();
          handleEditCallback(params.row?.id);
        };
        return (
          <IconButton onClick={handleEdit} aria-label="edit">
            <EditIcon />
          </IconButton>
        );
      },
      width: 100,
    },
    {
      field: "delete",
      headerName: "Deletar",
      sortable: false,
      renderCell: (params: GridRenderCellParams<any, any, any>) => {
        const handleDelete = (e: any) => {
          e.stopPropagation();
          handleDeleteCallback(params.row.id);
        };
        return (
          <IconButton onClick={handleDelete} aria-label="delete">
            <DeleteIcon />
          </IconButton>
        );
      },
      width: 100,
    },
  ];
};

export default function AppointmentTable() {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    setAppointmentServiceDataStatus,
    setAppointmentServiceCategory,
    templateList,
    setAppointment,
  } = useAppointment();
  const [dataRows, setDataRows] = useState<IAppointmentService[]>([]);
  const [viewRows, setViewRows] = useState<IAppointmentService[]>([]);

  useEffect(() => {
    loadServicesList();
  }, []);

  const loadServicesList = async () => {
    const clinicId = getClinicId();
    if (clinicId) {
      const { result } = await appointmentServiceRequest.getAll(clinicId);
      setDataRows(result);
      setViewRows(result);
    }
  };

  const handleCreate = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Tipo de serviço",
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="identificador do exame">' +
        `<select id="swal-input2" class="swal2-input" placeholder="Selecionar categoria"> <option value="Exam">Exame</option> <option value="Cirurgy" selected>Cirurgia</option> <option value="Product">Produto</option> <option value="Petshop">Pet Shop</option></select>`,
      preConfirm: () => {
        const input1 = document.getElementById(
          "swal-input1"
        ) as HTMLInputElement;
        const input2 = document.getElementById(
          "swal-input2"
        ) as HTMLInputElement;
        return [input1.value, input2.value];
      },
      showCancelButton: true,
      cancelButtonText: "Cancelar",
    });
    if (formValues) {
      const result = await searchAppointment(parseInt(formValues[0]));

      if (result) {
        setAppointment(result);
        setAppointmentServiceCategory(
          formValues[1] as "Cirurgy" | "Exam" | "Product" | "Petshop"
        );
        setAppointmentServiceDataStatus("create");
        navigate(`${location.pathname}/registrar/${formValues[0]}`);
      } else {
        await Swal.fire({
          title: "Consulta não encontrada!",
          text: "Verifique o identificador da consulta",
          icon: "warning",
        });
      }
    }
  };

  const searchAppointment = async (id: number) => {
    try {
      const clinicId = getClinicId();
      if (clinicId) {
        const { result } = await appointmentRequest.get(id, clinicId);
        return result;
      }
    } catch (error) {
      return false;
    }
  };

  const handleEdit = async (id: number) => {
    if (id) {
      const { result } = await appointmentServiceRequest.get(id);
      setAppointmentServiceDataStatus("edit");
      setAppointmentServiceCategory(result.serviceType.category);
      navigate(`${location.pathname}/${id}`);
    }
  };

  const handleView = async (id: number) => {
    if (id) {
      const { result } = await appointmentServiceRequest.get(id);

      setAppointmentServiceDataStatus("view");
      setAppointmentServiceCategory(result.serviceType.category);
      navigate(`${location.pathname}/${id}`);
    }
  };

  const handleDelete = (id: number) => {
    Swal.fire({
      title: "Deletar registro?",
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: "Deletar",
      denyButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        appointmentServiceRequest
          .delete(id)
          .then((res) => {
            Swal.fire({ title: "Deletado com sucesso!", icon: "success" });
            loadServicesList();
          })
          .catch((e) =>
            Swal.fire({ title: "Erro ao deletar!", icon: "error" })
          );
      }
    });
  };

  const handleSearch = (searchText: string) => {
    let filteredRows = dataRows.filter((dataRows) => {
      return (
        String(dataRows.notes)
          .toLocaleLowerCase()
          .includes(searchText.toLocaleLowerCase()) ||
        String(dataRows.appointmentId)
          .toLocaleLowerCase()
          .includes(searchText.toLocaleUpperCase())
      );
    });
    setViewRows(filteredRows);
  };

  const handleClearSearch = () => {
    setViewRows(dataRows);
  };
  return (
    <DataGrid
      columns={columns(handleView, handleEdit, handleDelete, templateList)}
      rows={viewRows}
      handleClearSearch={handleClearSearch}
      handleCreate={handleCreate}
      handleSearch={handleSearch}
    />
  );
}
