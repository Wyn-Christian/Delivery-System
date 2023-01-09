import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import Header from "../components/Header";
import { tokens } from "../contexts/Theme";
import { productsMockData } from "../mockData";

function Products() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID", flex: 1, editable: true },
    { field: "name", headerName: "Name", flex: 2, editable: true },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 1,
      editable: true,
    },

    {
      field: "stocks",
      headerName: "Stocks",
      headerAlign: "left",
      align: "left",
      type: "number",
      flex: 1,
      editable: true,
    },
    { field: "variants", headerName: "Variants", flex: 1, editable: true },
  ];
  return (
    <main>
      <Header title="Products" />

      {/* <div className="table-data" id="dashboard">
        <div className="order">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Stocks</th>
                <th>Variants</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <p>001</p>
                </td>
                <td>Red Velvet Cheesecake</td>
                <td>900</td>
                <td>
                  <div>10</div>
                </td>
                <td>10x12</td>
              </tr>
              <tr>
                <td>
                  <p>002</p>
                </td>
                <td>Carrot Cake</td>
                <td>900</td>
                <td>
                  <div>10</div>
                </td>
                <td>10x12</td>
              </tr>
              <tr>
                <td>
                  <p>003</p>
                </td>
                <td>Ube Cake</td>
                <td>900</td>
                <td>
                  <div>10</div>
                </td>
                <td>10x12</td>
              </tr>
              <tr>
                <td>
                  <p>004</p>
                </td>
                <td>Tiramisu</td>
                <td>900</td>
                <td>
                  <div>10</div>
                </td>
                <td>10x12</td>
              </tr>
              <tr>
                <td>
                  <p>005</p>
                </td>
                <td>Chocofudge Cake</td>
                <td>900</td>
                <td>
                  <div>10</div>
                </td>
                <td>10x12</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div> */}

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
          rows={productsMockData}
          columns={columns}
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
    </main>
  );
}

export default Products;
