import { DataGrid } from "@mui/x-data-grid";
import { Box, useTheme } from "@mui/material";

import Header from "../components/Header";
import { ordersMockData } from "../mockData";
import { tokens } from "../contexts/Theme";

function Orders() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID", flex: 1, editable: true },
    { field: "user", headerName: "User", flex: 2, editable: true },
    {
      field: "status",
      headerName: "Status",
      type: "singleSelect",
      valueOptions: ["completed", "pending", "process"],
      flex: 1,
      editable: true,
      renderCell: ({ row: { status } }) => (
        <div className={`status ${status.toLowerCase()}`}>
          {status.toUpperCase()}
        </div>
      ),
    },
    {
      field: "date_order",
      headerName: "Date Order",
      type: "date",
      flex: 1,
      editable: true,
    },
  ];

  return (
    <main>
      <Header title="Orders" />

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
          rows={ordersMockData}
          columns={columns}
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
    </main>
  );
}

export default Orders;
