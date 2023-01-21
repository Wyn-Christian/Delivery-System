import { DataGrid } from "@mui/x-data-grid";
import { Box, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

import { checkoutsMockData } from "../mockData";
import Header from "../components/Header";
import { tokens } from "../contexts/Theme";
import { useUser } from "../contexts/User";
import { usePorts } from "../contexts/Ports";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "PHP",
});

function Checkouts() {
  const ports = usePorts();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { user } = useUser();

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://localhost:${ports.SERVER_PORT}/catalog/checkout-items/${user.id}`
      )
      .then((res) => {
        let result = res.data.list_checkout_items.map((v) => {
          return {
            ...v,
            product: v.product_id.name,
            variant: v.variant_id.name,
          };
        });
        setData(result);
      });
  }, [user.id]);

  const columns = [
    { field: "id", headerName: "ID", flex: 2 },
    { field: "createdAt_formatted", headerName: "Created At", flex: 1 },
    {
      field: "product",
      headerName: "Product Name",
      flex: 2,
      // valueFormatter: ({ value }) => value.name,
    },
    {
      field: "variant",
      headerName: "Variant",
      flex: 1,
      // valueFormatter: ({ value }) => value.name,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      headerAlign: "left",
      align: "left",
      type: "number",
      flex: 1,
    },
    {
      field: "total_price",
      headerName: "Total Price",
      headerAlign: "left",
      align: "left",
      type: "number",
      flex: 1,
      editable: true,
      valueFormatter: (params) => {
        if (params.value === null) {
          return "₱0";
        }
        return currencyFormatter.format(params.value);
      },
    },
  ];

  return (
    <main>
      <Header title="Checkouts" />

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
          "& .MuiTablePagination-displayedRows": {
            fontFamily: "Poppins",
            fontSize: "1rem",
          },
          "& .MuiSelect-nativeInput": {
            fontFamily: "Poppins",
            fontSize: "1rem",
          },
          "& .MuiTablePagination-selectLabel": {
            fontFamily: "Poppins",
            fontWeight: "500",
            fontSize: "1rem",
          },
        }}
      >
        <DataGrid rows={data} columns={columns} />
      </Box>
    </main>
  );
}

export default Checkouts;
