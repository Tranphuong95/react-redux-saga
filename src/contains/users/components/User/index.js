import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import queryString from "query-string";
import { getUser, updateUser } from "../../actions";
import { useSnackbar } from "notistack";

const User = (props) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useParams();
  const location = useLocation();
  const { view, edit } = queryString.parse(location.search);
  const {
    user: { userName: nameData, email: emailData, phoneNumber: phoneData }, updateSuccess
  } = useSelector((state) => state.userReducers);

  useEffect(() => {
    dispatch(getUser(userId, enqueueSnackbar));
  }, []);
  useEffect(()=>{
    if(updateSuccess){
      navigate(-1)
    }
  },[updateSuccess])
  
  useEffect(() => {
    setUserName(nameData);
    setEmail(emailData);
    setPhoneNumber(phoneData);
  }, [nameData, emailData, phoneData]);

  const handleChange = ({ target: { value } }, name) => {
    if (name === "userName") {
      setUserName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "phoneNumber") {
      setPhoneNumber(value);
    }
  };
  const handleGoBack=(e)=>{
    e.preventDefault();
    navigate(-1);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateUser({ id: userId, userName, email, phoneNumber }, enqueueSnackbar));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Typography sx={{ margin: "24px 0" }}>
        Thông tin chi tiết người dùng
      </Typography>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          required
          id="outlined-required"
          label="Name"
          defaultValue=""
          value={userName}
          onChange={(e) => handleChange(e, "userName")}
          InputProps={{
            readOnly: view,
          }}
        />
        <TextField
          required
          id="outlined-required"
          label="Email"
          defaultValue=""
          value={email}
          onChange={(e) => handleChange(e, "email")}
          InputProps={{
            readOnly: view,
          }}
        />
        <TextField
          required
          id="outlined-required"
          label="Phone"
          defaultValue=""
          value={phoneNumber}
          onChange={(e) => handleChange(e, "phoneNumber")}
          InputProps={{
            readOnly: view,
          }}
        />
        {/* <TextField
          id="outlined-read-only-input"
          label="Read Only"
          defaultValue="Hello World"
          InputProps={{
            readOnly: true,
          }}
        /> */}
        
        <div>
          <Button type="button" color="secondary" variant="contained" sx={{padding: "8px 24px", margin: "24px 12px 24px 0", minWidth: "9em"}} onClick={handleGoBack}>Quay lại</Button>
          {edit && (
          <Button type="submit" variant="contained" sx={{padding: "8px 24px", margin: "24px 0 24px 12px", minWidth: "9em"}}>Lưu</Button>
          )}
        </div>
      </Box>
    </div>
  );
};

export default User;
