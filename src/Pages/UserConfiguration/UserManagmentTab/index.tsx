import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import DataGrid from "../../../Components/DataGrid";
import userRequest from "../../../Services/API/endpoints/user";
import { getClinicId } from "../../../Services/Auth";
import { IUser, ROLE } from "../../../Services/Types";
import { useVeterinary } from "../../../Services/Contexts/VeterinaryClinicContext";
import useUserConfiguration from "../useUserConfiguration";
interface IProps {
  children?: React.ReactNode;
}

const columns = (
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
      field: "firstName",
      headerName: "Nome",
      flex: 1,
    },
    {
      field: "lastName",
      headerName: "Sobrenome",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "crmv",
      headerName: "CRMV",
      flex: 1,
    },
    {
      field: "created_at",
      headerName: "Data de criação",
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

const UserManagmentTab: React.FC<IProps> = () => {
  const navigate = useNavigate();
  const { setUserDataStatus, userList } = useUserConfiguration(null);
  const [dataRows, setDataRows] = useState<IUser[]>([]);
  const [viewRows, setViewRows] = useState<IUser[]>([]);

  useEffect(() => {
    loadUserList();
  }, []);

  const loadUserList = () => {
    setViewRows(userList);
    setDataRows(userList);
  };

  const handleCreate = () => {
    setUserDataStatus("create");
    navigate(`/usuarios/registrar`);
  };

  const handleEdit = (id: number) => {
    setUserDataStatus("edit");
    navigate(`/usuarios/${id}`);
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
        userRequest
          .delete(id)
          .then((res) => {
            Swal.fire({ title: "Deletado com sucesso!", icon: "success" });
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
        dataRows.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
        dataRows.lastName.toLowerCase().includes(searchText.toLowerCase()) ||
        `${dataRows.firstName} ${dataRows.lastName}`
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        dataRows.email.toLowerCase().includes(searchText.toLowerCase()) ||
        dataRows.crmv?.toLowerCase().includes(searchText.toLowerCase()) ||
        format(
          new Date(dataRows.created_at?.valueOf() as string),
          "dd/MM/yyyy HH:mm"
        ).includes(searchText)
      );
    });
    setViewRows(filteredRows);
  };
  const handleClearSearch = () => {
    setViewRows(dataRows);
  };
  return (
    <DataGrid
      columns={columns(handleEdit, handleDelete)}
      rows={viewRows}
      handleClearSearch={handleClearSearch}
      handleCreate={handleCreate}
      handleSearch={handleSearch}
    />
  );
};
export default UserManagmentTab;
