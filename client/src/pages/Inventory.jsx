import { DataGrid } from "@mui/x-data-grid";
import { Box, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

import Header from "../components/Header";
import { tokens } from "../contexts/Theme";
import { useUser } from "../contexts/User";
import { inventoryMockData } from "../mockData";

function Inventory() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { user } = useUser();

  const [data, setData] = useState([]);
  // const [data, setData] = useState(inventoryMockData);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/catalog/inventories/${user.id}`)
      .then((res) => {
        setData(res.data.list_inventories);
      });
  }, [user.id]);

  const columns = [
    { field: "id", headerName: "ID (Auth Keys) ", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    {
      field: "createdAt_formatted",
      headerName: "Created At",
      type: "date",
      editable: true,
      flex: 1,
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
        <DataGrid rows={data} columns={columns} />
      </Box>
    </main>
  );
}

export default Inventory;
