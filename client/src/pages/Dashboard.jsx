import { DataGrid } from "@mui/x-data-grid";
import { Box, useTheme } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

import { checkoutsMockData } from "../mockData";
import Header from "../components/Header";
import { tokens } from "../contexts/Theme";
import { useUser } from "../contexts/User";
import { usePorts } from "../contexts/Ports";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "PHP",
});

const InfoCard = ({ title, amount, icon }) => {
  return (
    <li>
      <i className={`bx bxs-${icon}`}></i>
      <span className="text">
        <h3>{amount}</h3>
        <p>{title}</p>
      </span>
    </li>
  );
};

function Dashboard() {
  const ports = usePorts();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { user } = useUser();
  // const [data, setData] = useState(checkoutsMockData);
  const [data, setData] = useState([]);
  const [summary, setSummary] = useState({});

  useEffect(() => {
    axios
      .get(
        `http://localhost:${ports.SERVER_PORT}/catalog/checkout-items/${user.id}`
      )
      .then((res) => {
        setData(res.data.list_checkout_items);
      });
    axios
      .get(
        `http://localhost:${ports.SERVER_PORT}/users/${user.id}/dashboard`
      )
      .then((res) => {
        console.log(res);
        setSummary(res.data);
      });
  }, [user.id]);

  const columns = [
    { field: "id", headerName: "ID", flex: 2 },
    { field: "createdAt_formatted", headerName: "Created At", flex: 1 },
    {
      field: "product_id",
      headerName: "Product Name",
      flex: 2,
      valueFormatter: ({ value }) => value.name,
    },
    {
      field: "variant_id",
      headerName: "Variant",
      flex: 1,
      valueFormatter: ({ value }) => value.name,
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
      <Header title="Dashboard" />

      <ul className="box-info">
        <InfoCard
          title="Total Bought Products"
          amount={
            summary.checkout_items
              ? summary.checkout_items.total_product_bought
              : 0
          }
          icon="calendar-check"
        />
        <InfoCard
          title="Total Products"
          amount={summary.total_products ? summary.total_products : 0}
          icon="package"
        />

        <InfoCard
          title="Total Sales"
          amount={
            summary.checkout_items
              ? `${currencyFormatter.format(
                  summary.checkout_items.total_sales.$numberDecimal
                )}`
              : 0
          }
          icon="package"
        />
      </ul>

      <div className="head-title">
        <div className="left">
          <h2>Recent Checkouts</h2>
        </div>
      </div>

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

export default Dashboard;
