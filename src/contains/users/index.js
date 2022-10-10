import * as React from "react";
import "./index.scss";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Button, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";

import { deleteUser, getListUsers } from "./actions";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const columns = (handleGoViewUser, handleGoEditUser, handelDeleteUser) => [
  { field: "index", headerName: "Index", width: 90 },
  {
    field: "userName",
    headerName: "Name",
    width: 150,
    editable: true,
  },
  {
    field: "email",
    headerName: "Email",
    width: 150,
    editable: true,
  },
  {
    field: "phoneNumber",
    headerName: "Phone",
    // type: "number",
    width: 150,
    editable: true,
  },
  {
    field: "action",
    headerName: "Action",
    description: "Hành động",
    sortable: false,
    width: 120,
    renderCell: (params) => {
      return (
        <>
          <IconButton
            aria-label="view"
            size="small"
            onClick={() => handleGoViewUser(params?.row?.id)}
          >
            <VisibilityIcon color="success" />
          </IconButton>
          <IconButton
            aria-label="edit"
            size="small"
            onClick={() => handleGoEditUser(params?.row?.id)}
          >
            <EditIcon color="primary" />
          </IconButton>
          <IconButton
            aria-label="delete"
            size="small"
            onClick={() => handelDeleteUser(params?.row?.id)}
          >
            <DeleteIcon color="error" />
          </IconButton>
        </>
      );
    },
  },
  // {
  //   field: 'fullName',
  //   headerName: 'Full name',
  //   description: 'This column has a value getter and is not sortable.',
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params) =>
  //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  // },
];

export default function Users() {
  const dispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const {
    data: datas,
    pagination: { page, limit },
  } = useSelector((state) => {
    return state.userReducers.usersData;
  });
  const navigate = useNavigate();
  const users = Array.isArray(datas)
    ? datas.map((m, i) => ({
        ...m,
        id: m._id,
        index: i + 1 + (page - 1) * limit,
      }))
    : [];
  React.useEffect(() => {
    dispatch(getListUsers(enqueueSnackbar));
  }, []);

  const handleAddUser=()=>{
    navigate("add");
  }
  const handleGoViewUser = (id) => {
    navigate(`${id}?view=true`);
  };
  const handleGoEditUser = (id) => {
    navigate(`${id}?edit=true`);
  };
  const handelDeleteUser = (id) => {
    dispatch(deleteUser(id, enqueueSnackbar))
  };
  return (
    <div className="users-wrapper">
      <div className="users-title">
      <Typography component="h2" sx={{ margin: "24px 0", textAlign: "left" }}>
        Danh sách người dùng
      </Typography>
      <Button variant="contained" onClick={handleAddUser}>Thêm người dùng</Button>
      </div>
      <Box sx={{ width: "100%" }}>
        <DataGrid
          rows={users}
          columns={columns(
            handleGoViewUser,
            handleGoEditUser,
            handelDeleteUser
          )}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
          autoHeight
          autoPageSize
        />
      </Box>
    </div>
  );
}
