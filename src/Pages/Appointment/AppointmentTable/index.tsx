import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import DataGrid from "../../../Components/DataGrid";
import appointmentRequest from "../../../Services/API/endpoints/appointment";
import { getClinicId } from "../../../Services/Auth";
import { useAppointment } from "../../../Services/Contexts/AppointmentContext";
import {
  IAppointment,
  EnumStatus,
  EnumPaymentStatus,
} from "../../../Services/Types";
import VisibilityIcon from "@mui/icons-material/Visibility";
const columns = (
  handleViewCallback: (id: number) => void,
  handleEditCallback: (id: number) => void,
  handleDeleteCallback: (id: number) => void
): GridColDef[] => {
  return [
    {
      field: "id",
      headerName: "ID",
      width: 100,
    },
    {
      field: "topic",
      headerName: "Tópico",
      flex: 1,
    },
    {
      field: "date",
      headerName: "Data da consulta",
      renderCell: (params: GridRenderCellParams<any, any, any>) => {
        return (
          <span>
            {format(new Date(params.value as string), "dd/MM/yyyy HH:mm")}
          </span>
        );
      },
      flex: 1,
    },
    {
      field: "animal",
      headerName: "Paciente",
      renderCell: (params: GridRenderCellParams<any, any, any>) => {
        return <span>{params.row.animal.name}</span>;
      },
      flex: 1,
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
      field: "payment_status",
      headerName: "Pagamento",
      renderCell: (params: GridRenderCellParams<any, any, any>) => {
        const paymentStatus = params.value as EnumPaymentStatus;
        return <span>{EnumPaymentStatus[paymentStatus]}</span>;
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
          handleViewCallback(params.row.id);
        };
        return (
          <IconButton onClick={handleView} aria-label="edit">
            <VisibilityIcon style={{ color: "blue" }} />
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
          handleEditCallback(params.row.id);
        };
        return (
          <IconButton onClick={handleEdit} aria-label="edit">
            <EditIcon style={{ color: "green" }} />
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
            <DeleteIcon style={{ color: "red" }} />
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
  const { setAppointmentDataStatus } = useAppointment();

  const [dataRows, setDataRows] = useState<IAppointment[]>([]);
  const [viewRows, setViewRows] = useState<IAppointment[]>([]);

  useEffect(() => {
    loadAppointmentList();
  }, []);

  const loadAppointmentList = async () => {
    const clinicId = getClinicId();
    if (clinicId) {
      const { result } = await appointmentRequest.getAll(clinicId);

      setDataRows(result);
      setViewRows(result);
    }
  };

  const handleCreate = () => {
    navigate(`${location.pathname}/registrar`);
  };

  const handleEdit = (id: number) => {
    setAppointmentDataStatus("edit");
    navigate(`${location.pathname}/${id}`);
  };
  const handleView = (id: number) => {
    setAppointmentDataStatus("view");
    navigate(`${location.pathname}/${id}`);
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
        appointmentRequest
          .delete(id)
          .then((res) => {
            Swal.fire({ title: "Deletado com sucesso!", icon: "success" });
            loadAppointmentList();
          })
          .catch((e) =>
            Swal.fire({ title: "Erro ao deletar!", icon: "error" })
          );
      }
    });
  };
  const handleClearSearch = () => {
    setViewRows(dataRows);
  };
  const handleSearch = (searchText: string) => {
    let filteredRows = dataRows.filter((dataRow) => {
      return (
        dataRow.topic.toLowerCase().includes(searchText.toLowerCase()) ||
        format(
          new Date(dataRow.date?.valueOf() as string),
          "dd/MM/yyyy HH:mm"
        ).includes(searchText)
      );
    });
    setViewRows(filteredRows);
  };

  return (
    <DataGrid
      columns={columns(handleView, handleEdit, handleDelete)}
      rows={viewRows}
      handleClearSearch={handleClearSearch}
      handleCreate={handleCreate}
      handleSearch={handleSearch}
    />
  );
}
