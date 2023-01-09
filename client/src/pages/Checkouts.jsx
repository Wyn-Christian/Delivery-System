import { DataGrid } from "@mui/x-data-grid";
import { Box, useTheme } from "@mui/material";

import { checkoutsMockData } from "../mockData";
import Header from "../components/Header";
import { tokens } from "../contexts/Theme";

const Item = ({
  id,
  created_at,
  product_name,
  variant,
  quantity,
  total_price,
}) => {
  return (
    <tr>
      <td>
        <p>{id}</p>
      </td>
      <td>{created_at}</td>
      <td>{product_name}</td>
      <td>{variant}</td>
      <td>{quantity}</td>
      <td>{total_price}</td>
    </tr>
  );
};

function Checkouts() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID", flex: 1, editable: true },
    { field: "created_at", headerName: "Created At", flex: 1, editable: true },
    {
      field: "product_name",
      headerName: "Product Name",
      flex: 2,
      editable: true,
    },
    {
      field: "variant",
      headerName: "Variant",
      flex: 1,
      editable: true,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      headerAlign: "left",
      align: "left",
      type: "number",
      flex: 1,
      editable: true,
    },
    {
      field: "total_price",
      headerName: "Total Price",
      headerAlign: "left",
      align: "left",
      type: "number",
      flex: 1,
      editable: true,
    },
  ];

  return (
    <>
      <main>
        <Header title="Checkouts" />

        {/* <div className="table-data" id="dashboard">
          <div className="order">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Created at</th>
                  <th>Product Name</th>
                  <th>Variant</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {checkoutsMockData.map((v, i) => (
                  <Item {...v} key={i} />
                ))}
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
            rows={checkoutsMockData}
            columns={columns}
            experimentalFeatures={{ newEditingApi: true }}
          />
        </Box>
      </main>
    </>
  );
}

export default Checkouts;
