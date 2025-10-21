import { Box, TextField } from "@mui/material";
import React, { useState } from "react";
import { ButtonBlue } from "../components/ui/ButtonBlue";
import "../style/pages/registrationPages.css";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "../api/authApi";
import CircularIndeterminate from "../components/ui/CircularIndeterminate";
function RegistrationPagesStepOneEmail() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const [name, setName] = useState("");
  const navigate = useNavigate(); // Тепер навігація тут

  async function registration() {
    try {
      setLoader(true);
      const registerAccount = await authApi.register(email, password, name);
      if (registerAccount) {
        console.log(registerAccount);
        setLoader(false);
        localStorage.setItem("googleId", registerAccount.googleId);
        navigate("/registrationStepAccount");
      }
    } catch (error) {
      console.log(error);
      setLoader(false);
    } finally {
      setLoader(false);
    }
  }
  return (
    <div className="registration-email">
      {loader == true ? (
        <div className="loader">
          <CircularIndeterminate />
        </div>
      ) : (
        ""
      )}

      <div className={`container ${loader == true ? "active-blur" : ""}`}>
        <div className="registrationpagesaccount__backBlock">
          <div className="registrationpagesaccount__backBlock-button">
            <Link
              to={"/registrationStep1"}
              className="registrationPagesstepone__backButton"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.28796 12L14.298 18.01L15.712 16.596L11.112 11.996L15.712 7.39599L14.298 5.98999L8.28796 12Z"
                  fill="#F7F7FC"
                />
              </svg>
            </Link>
          </div>
        </div>
        <div className="registration-email__block">
          <div className="registration-email__form">
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
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="outlined-basic"
                label="Name account  (Required)"
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
          <div className="registration-email__submit-form">
            <ButtonBlue textButton="Next step" onClick={registration} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrationPagesStepOneEmail;
