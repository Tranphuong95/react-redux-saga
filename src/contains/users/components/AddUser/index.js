import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import {  useNavigate } from "react-router-dom";
import { addUser} from "../../actions";

const AddUser = (props) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {success} = useSelector((state) => state.userReducers);
  const successCurrent=useRef();
  useEffect(()=>{
    console.log("successCurent", success, successCurrent.current)
    if(successCurrent.current!==success){
      if(success && successCurrent.current===false){
        navigate(-1)
      }
      successCurrent.current=success;
    }
  }, [success]);
  
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
      await dispatch(addUser({userName, email, phoneNumber }));
      // navigate(-1);
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
          
        />
        <TextField
          required
          id="outlined-required"
          label="Email"
          defaultValue=""
          value={email}
          onChange={(e) => handleChange(e, "email")}
         
        />
        <TextField
          required
          id="outlined-required"
          label="Phone"
          defaultValue=""
          value={phoneNumber}
          onChange={(e) => handleChange(e, "phoneNumber")}
          
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
          <Button type="submit" variant="contained" sx={{padding: "8px 24px", margin: "24px 0 24px 12px", minWidth: "9em"}}>Lưu</Button>
        </div>
      </Box>
    </div>
  );
};

export default AddUser;
