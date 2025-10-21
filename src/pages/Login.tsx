import { Box, TextField } from "@mui/material";
import React, { useState } from "react";
import { ButtonBlue } from "../components/ui/ButtonBlue";
import "../style/pages/login.css";
import { authApi } from "../api/authApi";
import { useNavigate } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async () => {
    if (email === null || email === "") {
      return console.log("this fields required");
    }
    if (password === null || password === "") {
      return console.log("this fields required");
    }
    try {
      const loginToAccount = await authApi.login(email, password);
      if (loginToAccount) {
        console.log("succes you login to your account", loginToAccount);
        const googleId = loginToAccount.user.googleId;
        localStorage.setItem("googleId", googleId);
        navigate("/chats");
      }
    } catch (error) {
      console.log("something went wrong", error);
    }
  };
  return (
    <div className="login">
      <div className="login__text">Login to your Account</div>
      <div className="login__form">
        {" "}
        <Box
          component="form"
          sx={{
            backgroundColor: "var(--neutral-dark)", // фон
            width: "327px", // ширина

            borderRadius: "4px",

            "& .MuiSelect-select": {
              display: "flex",
              alignItems: "center", // вирівнює контент по вертикалі
              height: "100%", // забирає зайвий простір
              padding: "10px", // додає відступи всередині
              color: "var(--neutral-off-white)", // колір тексту всередині
            },
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none", // прибираємо рамку
            },
            "& .MuiSelect-icon": {
              top: "50%", // вирівнюємо іконку по центру
              transform: "translateY(-50%)", // забезпечує вертикальне центрування
            },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            sx={{
              backgroundColor: "var(--neutral-dark)", // фон
              borderRadius: "4px",
              width: "327px", // ширина
              color: "var(--neutral-off-white)", // колір тексту
              "& .MuiInputBase-input": {
                color: "var(--neutral-off-white)", // колір тексту в полі введення
              },
              "& .MuiFormLabel-root": {
                color: "var(--neutral-off-white)", // колір тексту мітки
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "var(--neutral-off-white)", // колір рамки
              },
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="outlined-basic"
            label="Email (Required)"
            variant="outlined"
          />
        </Box>
        <Box
          component="form"
          sx={{
            backgroundColor: "var(--neutral-dark)", // фон
            width: "327px", // ширина

            borderRadius: "4px",

            "& .MuiSelect-select": {
              display: "flex",
              alignItems: "center", // вирівнює контент по вертикалі
              height: "100%", // забирає зайвий простір
              padding: "10px", // додає відступи всередині
              color: "var(--neutral-off-white)", // колір тексту всередині
            },
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none", // прибираємо рамку
            },
            "& .MuiSelect-icon": {
              top: "50%", // вирівнюємо іконку по центру
              transform: "translateY(-50%)", // забезпечує вертикальне центрування
            },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            sx={{
              backgroundColor: "var(--neutral-dark)", // фон
              borderRadius: "4px",
              width: "327px", // ширина
              color: "var(--neutral-off-white)", // колір тексту
              "& .MuiInputBase-input": {
                color: "var(--neutral-off-white)", // колір тексту в полі введення
              },
              "& .MuiFormLabel-root": {
                color: "var(--neutral-off-white)", // колір тексту мітки
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "var(--neutral-off-white)", // колір рамки
              },
            }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="outlined-basic"
            label="Password (Required)"
            variant="outlined"
          />
        </Box>
      </div>
      <div className="login__button">
        {" "}
        <ButtonBlue textButton="Login" onClick={handleSubmit} />
      </div>
    </div>
  );
}

export default Login;
