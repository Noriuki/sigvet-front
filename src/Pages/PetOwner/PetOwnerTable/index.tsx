import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import DataGrid from "../../../Components/DataGrid";
import React, { useEffect, useState } from "react";
import { usePet } from "../../../Services/Contexts/PetContext";
import { useLocation, useNavigate } from "react-router-dom";
import { IPetOwner } from "../../../Services/Types";
import petOwnerRequest from "../../../Services/API/endpoints/petOwner";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import Swal from "sweetalert2";
import { getClinicId } from "../../../Services/Auth";
import VisibilityIcon from "@mui/icons-material/Visibility";
const columns = (
  handleViewCallback: (id: number) => void,
  handleEditCallback: (id: number) => void,
  handleDeleteCallback: (id: number) => void
): GridColDef[] => {
  return [
    { field: "firstName", headerName: "Nome", flex: 1 },
    { field: "lastName", headerName: "Sobrenome", flex: 1 },
    { field: "cellphone", headerName: "Celular", flex: 1 },
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

export default function PetOwnerTable() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setPetOwnerDataStatus } = usePet();

  const [dataRows, setDataRows] = useState<IPetOwner[]>([]);
  const [viewRows, setViewRows] = useState<IPetOwner[]>([]);
  useEffect(() => {
    loadPetOwnerList();
  }, []);

  const loadPetOwnerList = async () => {
    const clinicId = getClinicId();
    if (clinicId) {
      const petOwnerList = await petOwnerRequest.getAll(clinicId);
      setDataRows(petOwnerList.result);
      setViewRows(petOwnerList.result);
    }
  };

  const handleCreate = () => {
    setPetOwnerDataStatus("create");
    navigate(`${location.pathname}/registrar`);
  };

  const handleEdit = (id: number) => {
    setPetOwnerDataStatus("edit");
    navigate(`${location.pathname}/${id}`);
  };

  const handleView = (id: number) => {
    setPetOwnerDataStatus("view");
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
        petOwnerRequest
          .delete(id)
          .then((res) => {
            Swal.fire({ title: "Deletado com sucesso!", icon: "success" });
            loadPetOwnerList();
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
        dataRows.cellphone.includes(searchText)
      );
    });
    setViewRows(filteredRows);
  };

  const handleClearSearch = () => {
    setViewRows(dataRows);
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
