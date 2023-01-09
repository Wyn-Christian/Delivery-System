import { DataGrid } from "@mui/x-data-grid";
import { Box, useTheme } from "@mui/material";

import { inventoryMockData } from "../mockData";
import Header from "../components/Header";
import { tokens } from "../contexts/Theme";

function Inventory() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID (Auth Keys) ", flex: 1, editable: true },
    { field: "status", headerName: "Status", flex: 1, editable: true },
    {
      field: "created_at",
      headerName: "Created At",
      flex: 1,
      editable: true,
    },
  ];
  return (
    <main>
      <Header title={"Inventory"} />
      <Box
        height="75vh"
        pt="1.2rem"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
            fontFamily: "Poppins",
            fontSize: "1rem",
          },
          "& .MuiDataGrid-main ": {
            borderRadius: "20px 20px 0px 0px",
            backgroundColor: `${colors.dark}`,
          },
          "& .MuiDataGrid-cell": {
            color: `${colors.dark}`,
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.light,
            borderBottom: "none",
            color: colors.dark,
            fontWeight: "bold",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: "bold",
          },
          "& .MuiDataGrid-columnHeaderTitleContainer": {
            fontSize: "0.8rem",
            m: "0 10px",
          },
          "& .MuiDataGrid-row": {
            backgroundColor: colors.light,
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.light,
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.light,
            borderRadius: "0 0 20px 20px",
          },
          "& .MuiCheckbox-root": {
            color: `#b7ebde !important`,
          },
        }}
      >
        <DataGrid
          rows={inventoryMockData}
          columns={columns}
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
    </main>
  );
}

export default Inventory;
