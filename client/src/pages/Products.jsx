import { Box, useTheme } from "@mui/material";
import Button from "@mui/material/Button";
import {
  DataGrid,
  GridActionsCellItem,
  GridRowModes,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import { useEffect, useState } from "react";
import axios from "axios";

import { productsMockData } from "../mockData";
import Header from "../components/Header";
import { tokens } from "../contexts/Theme";
import { useUser } from "../contexts/User";
import { usePorts } from "../contexts/Ports";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";

var mongoObjectId = function () {
  var timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
  return (
    timestamp +
    "xxxxxxxxxxxxxxxx"
      .replace(/[x]/g, function () {
        return ((Math.random() * 16) | 0).toString(16);
      })
      .toLowerCase()
  );
};

function EditToolbar(props) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { setData, setRowModesModel } = props;

  let id = mongoObjectId();
  const handleClick = () => {
    setData((oldRows) => [
      ...oldRows,
      { id: id, name: "", category: "cake", isNew: true },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button
        startIcon={<AddIcon />}
        onClick={handleClick}
        variant="contained"
        sx={{
          backgroundColor: colors.dark,
          color: colors.light,
          "&:hover": {
            backgroundColor: colors.darkGrey,
            color: colors.dark,
          },
        }}
      >
        Add Product
      </Button>
    </GridToolbarContainer>
  );
}

function Products() {
  const ports = usePorts();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { inventories, user } = useUser();

  const [inventory, setInventory] = useState(
    inventories.length ? inventories[0].id : undefined
  );
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});

  useEffect(() => {
    axios
      .get(
        `http://localhost:${ports.SERVER_PORT}/catalog/products/inventory/${inventory}`
      )
      .then((res) => {
        let result = res.data.list_products.map((v) => {
          return {
            ...v,
            category: v.category_id.name,
            variants: [v.variant_set_id.variants_id.map((v) => v.name)],
            isNew: false,
          };
        });
        console.log(result);
        setData(result);
      });
  }, [inventory]);
  useEffect(() => {
    const getCategories = async () => {
      let result = await axios
        .get(
          `http://localhost:${ports.SERVER_PORT}/catalog/categories/${user.id}`
        )
        .then((result) =>
          result.data.list_categories.map((category) => category)
        );
      setCategories(result);
      console.log(categories);
    };
    getCategories();
  }, [user.id]);

  const handleAlignment = (event, newInventory) => {
    if (newInventory !== null) {
      setInventory(newInventory);
    }
  };

  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: {
        mode: GridRowModes.Edit,
      },
    });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: {
        mode: GridRowModes.View,
      },
    });
  };

  const handleDeleteClick = (id) => () => {
    setData(data.filter((v) => v.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = data.find((row) => row.id === id);

    // check if its new pending data
    if (editedRow.isNew) {
      setData(data.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = async (newRow) => {
    // Fetch UPDATE info sheeesh
    // set category_id and inventory_id
    [newRow.category_id] = categories.filter(
      (c) => c.name === newRow.category
    );
    if (!newRow.isNew) {
      axios
        .post(
          `http://localhost:${ports.SERVER_PORT}/catalog/product/${newRow.id}/update`,
          newRow
        )
        .then((result) => {
          console.log("Product updated");
          console.log(result.data);
        });

      axios
        .post(
          `http://localhost:${ports.BAKERY_SERVER_PORT}/api/${newRow.id}/update_product`,
          newRow
        )
        .then((result) => {
          console.log("API BAKERY updated");
        });
      const updatedRow = { ...newRow, isNew: false };
      setData(
        data.map((row) => (row.id === newRow.id ? updatedRow : row))
      );
      return updatedRow;
    } else if (newRow.isNew) {
      newRow.variant_set_id = "63c5055f0251c0798b612d39";
      newRow.user_id = user.id;
      newRow.inventory_id = inventory;

      let new_product = await axios
        .post(
          `http://localhost:${ports.SERVER_PORT}/catalog/product/create`,
          newRow
        )
        .then((result) => {
          console.log("Product created");
          console.log(result.data);
          return result.data;
        });
      newRow.id = new_product._id;
      console.log("inventory db test-----------");
      console.log(newRow);
      // create in INVENTORY
      axios
        .post(
          `http://localhost:${ports.BAKERY_SERVER_PORT}/api/create`,
          newRow
        )
        .then((result) => {
          console.log(
            "API BAKERY new product creted",
            result.data.new_product
          );
        });
      // create in BAKERY
      const createdRow = { ...newRow, isNew: false };
      setData(
        data.map((row) => (row.id === newRow.id ? createdRow : row))
      );
      return createdRow;
    }
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 1, editable: false },
    { field: "name", headerName: "Name", flex: 2, editable: true },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
      type: "singleSelect",
      valueOptions: () => categories.map((c) => c.name),
      editable: true,
    },
    {
      field: "img_name",
      headerName: "Image file Name",
      flex: 1,
      editable: true,
    },
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

    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "Actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              onClick={handleCancelClick(id)}
            />,
          ];
        }
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            onClick={handleEditClick(id)}
          />,
        ];
      },
    },
  ];

  return (
    <main>
      <Header title="Products" />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ToggleButtonGroup
          value={inventory}
          exclusive
          onChange={handleAlignment}
        >
          {!!inventories.length &&
            inventories.map((i) => (
              <ToggleButton key={i.id} value={i.id}>
                {i.name}
              </ToggleButton>
            ))}
        </ToggleButtonGroup>
      </Box>
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
          rows={data}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
          onRowEditStart={handleRowEditStart}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          onProcessRowUpdateError={(error) =>
            console.log(`On process row update error: ${error}`)
          }
          components={{
            Toolbar: EditToolbar,
          }}
          componentsProps={{
            toolbar: { setData, setRowModesModel },
          }}
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
    </main>
  );
}

export default Products;
