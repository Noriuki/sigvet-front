import { TextField } from "@mui/material";
import { styled } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";

export const MaterialDataGrid = styled(DataGrid)({
  width: "100%",
  margin: "0",
  boxShadow: "var(--dark-shadow)",
  borderRadius: 10,
  "& .MuiDataGrid-columnSeparator": {
    color: "transparent",
  },
  "& .MuiDataGrid-row:hover": {
    cursor: "pointer",
  },
  "& 	.MuiDataGrid-columnHeaderTitle": {
    color: "var(--titles)",
  },
});

export const SearchBar = styled(TextField)({
  width: "48%",
  "& fieldset": {
    borderRadius: "10px",
    border: "none",
    boxShadow: "var(--dark-shadow)",
  },
  "& input": {
    paddingLeft: "5px",
  },
});
