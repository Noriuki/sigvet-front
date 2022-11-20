import { CloseOutlined } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { Button, IconButton } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { ChangeEvent, useState } from "react";

import { MaterialDataGrid, SearchBar } from "./styled";

interface IDataGrid {
  columns: GridColDef[];
  rows: {}[];
  handleOpenRecord?: (rowID: number) => void;
  handleSearch: (search: string) => void;
  handleCreate: () => void;
  handleClearSearch: () => void;
}

export default function DataGrid(props: IDataGrid) {
  const { columns, rows, handleSearch, handleClearSearch, handleCreate } =
    props;
  const [searchText, setSearchText] = useState("");

  const clearSearch = () => {
    setSearchText("");
    handleClearSearch();
  };

  const handleSearchText = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let value = e.target.value;
    setSearchText(value);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <SearchBar
          type="text"
          name="datagrid-search"
          variant="outlined"
          size="small"
          color="secondary"
          value={searchText}
          onChange={handleSearchText}
          InputProps={{
            startAdornment: (
              <IconButton
                style={{
                  borderRadius: "5px 0px 0px 5px",
                  marginLeft: "-14px",
                  backgroundColor: "var(--secondary-300)",
                  color: "#fff",
                }}
                onClick={(e: any) => handleSearch(searchText)}
              >
                <SearchIcon />
              </IconButton>
            ),
            endAdornment: (
              <IconButton
                style={{
                  borderRadius: 0,
                  marginLeft: "-14px",
                  display: searchText === "" ? "none" : "inherit",
                }}
                onClick={clearSearch}
              >
                <CloseOutlined />
              </IconButton>
            ),
          }}
        />
        <Button
          onClick={handleCreate}
          style={{
            width: "20%",
            fontWeight: "bold",
            borderRadius: "5px",
            border: "none",
            boxShadow: "var(--dark-shadow)",
          }}
          variant="outlined"
          color="secondary"
        >
          Novo registro
        </Button>
      </div>
      <div
        style={{
          flex: 1,
          marginTop: "1rem",
        }}
      >
        <MaterialDataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          disableColumnMenu
        />
      </div>
    </div>
  );
}
