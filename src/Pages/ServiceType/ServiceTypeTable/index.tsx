import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import DataGrid from "../../../Components/DataGrid";
import serviceTypeRequest from "../../../Services/API/endpoints/serviceType";
import { getClinicId } from "../../../Services/Auth";
import { useAppointment } from "../../../Services/Contexts/AppointmentContext";
import { EnumCategory, IServiceType } from "../../../Services/Types";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { formatCurrency } from "../../../Services/Utils";
const columns = (
  handleViewCallback: (id: number) => void,
  handleEditCallback: (id: number) => void,
  handleDeleteCallback: (id: number) => void
): GridColDef[] => {
  return [
    {
      field: "name",
      headerName: "Nome",
      flex: 1,
    },
    {
      field: "category",
      headerName: "Categoria",
      flex: 1,
      renderCell: (params: GridRenderCellParams<any, any, any>) => {
        return (
          <span>
            {
              EnumCategory[
                `${params.row.category}` as keyof typeof EnumCategory
              ]
            }
          </span>
        );
      },
    },
    {
      field: "defaultPrice",
      headerName: "Preço base",
      flex: 1,
      renderCell: (params: GridRenderCellParams<any, any, any>) => {
        return <span>{formatCurrency(params.row.defaultPrice)}</span>;
      },
    },
    {
      field: "view",
      headerName: "Visualizar",
      renderCell: (params: GridRenderCellParams<any, any, any>) => {
        const handleView = (e: any) => {
          e.stopPropagation();
          handleViewCallback(params.row.id);
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

export default function AppointmentTable() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setServiceTypeDataStatus, setServiceTypeCategory } = useAppointment();
  const [dataRows, setDataRows] = useState<IServiceType[]>([]);
  const [viewRows, setViewRows] = useState<IServiceType[]>([]);

  useEffect(() => {
    loadServiceTypeList();
  }, []);

  const loadServiceTypeList = async () => {
    const clinicId = getClinicId();
    if (clinicId) {
      const serviceTypeList = await serviceTypeRequest.getAll(clinicId);
      setDataRows(serviceTypeList.result);
      setViewRows(serviceTypeList.result);
    }
  };

  const handleCreate = async () => {
    const { value } = await Swal.fire({
      title: "Tipo de serviço",
      input: "select",
      inputOptions: {
        Exam: "Exame",
        Cirurgy: "Cirurgia",
        Product: "Produto",
        Petshop: "Pet Shop",
      },
      inputPlaceholder: "Selecione uma categoria",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
    });
    if (value) {
      setServiceTypeCategory(value);
      setServiceTypeDataStatus("create");
      navigate(`${location.pathname}/registrar`);
    }
  };

  const handleEdit = (id: number) => {
    setServiceTypeDataStatus("edit");
    navigate(`${location.pathname}/${id}`);
  };

  const handleView = (id: number) => {
    setServiceTypeDataStatus("view");
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
        serviceTypeRequest
          .delete(id)
          .then((res) => {
            Swal.fire({ title: "Deletado com sucesso!", icon: "success" });
            loadServiceTypeList();
          })
          .catch((e) =>
            Swal.fire({ title: "Erro ao deletar!", icon: "error" })
          );
      }
    });
  };

  const handleSearch = (searchText: string) => {
    let filteredRows = dataRows.filter((dataRow) => {
      return (
        String(dataRow.category)
          .toLocaleLowerCase()
          .includes(searchText.toLocaleLowerCase()) ||
        String(dataRow.name)
          .toLocaleLowerCase()
          .includes(searchText.toLowerCase())
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
