import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import DataGrid from "../../../Components/DataGrid";
import petRequest from "../../../Services/API/endpoints/pet";
import { getClinicId } from "../../../Services/Auth";
import { usePet } from "../../../Services/Contexts/PetContext";
import { IPet } from "../../../Services/Types";
import VisibilityIcon from "@mui/icons-material/Visibility";

const columns = (
  handleViewCallback: (id: number) => void,
  handleEditCallback: (id: number) => void,
  handleDeleteCallback: (id: number) => void
): GridColDef[] => {
  return [
    { field: "name", headerName: "Nome", flex: 1 },
    {
      field: "especies",
      headerName: "Espécie",
      renderCell: (params: GridRenderCellParams<any, any, any>) => {
        return <span>{params.row.species?.name}</span>;
      },
      flex: 1,
    },
    {
      field: "race",
      headerName: "Raça",
      renderCell: (params: GridRenderCellParams<any, any, any>) => {
        return <span>{params.row.race?.name}</span>;
      },
      flex: 1,
    },
    {
      field: "sex",
      headerName: "sexo",
      renderCell: (params: GridRenderCellParams<any, any, any>) => {
        return <span>{params.row.sex === "M" ? "Macho" : "Fêmea"}</span>;
      },
      width: 100,
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
          <IconButton onClick={handleView} aria-label="view">
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

export default function PetTable() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setPetDataStatus } = usePet();
  const [dataRows, setDataRows] = useState<IPet[]>([]);
  const [viewRows, setViewRows] = useState<IPet[]>([]);

  useEffect(() => {
    loadPetList();
  }, []);

  const loadPetList = async () => {
    const clinicId = getClinicId();
    if (clinicId) {
      const petList = await petRequest.getAll(clinicId);
      setDataRows(petList.result);
      setViewRows(petList.result);
    }
  };

  const handleCreate = () => {
    navigate(`${location.pathname}/registrar`);
  };

  const handleEdit = (id: number) => {
    setPetDataStatus("edit");
    navigate(`${location.pathname}/${id}`);
  };
  const handleView = (id: number) => {
    setPetDataStatus("view");
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
        petRequest
          .delete(id)
          .then((res) => {
            Swal.fire({ title: "Deletado com sucesso!", icon: "success" });
            loadPetList();
          })
          .catch((e) =>
            Swal.fire({ title: "Erro ao deletar!", icon: "error" })
          );
      }
    });
  };

  const handleSearch = (searchText: string) => {
    let filteredRows = dataRows.filter((dataRows) => {
      return dataRows.name.toLowerCase().includes(searchText.toLowerCase());
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
