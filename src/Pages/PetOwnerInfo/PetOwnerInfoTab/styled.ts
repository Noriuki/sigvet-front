import { TextField } from "@mui/material";
import { styled } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";

export const MaterialDataGrid = styled(DataGrid)({
  width: "100%",
  margin: "25px 0",
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
  "& .MuiOutlinedInput-root": {
    borderRadius: " 0",
  },
  "& input": {
    paddingLeft: "5px",
  },
});
