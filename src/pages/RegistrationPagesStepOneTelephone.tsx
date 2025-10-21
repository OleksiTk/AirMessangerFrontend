import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { MenuItem } from "@mui/material";
import { ButtonBlue } from "../components/ui/ButtonBlue";
import { Link, useNavigate } from "react-router-dom";
function RegistrationPagesStepOneTelephone() {
  const currencies = [
    {
      value: "+62",
      label: (
        <img
          src="src/assets/Flag.svg"
          alt="USD Flag"
          style={{ width: "20px", marginRight: "8px" }}
        />
      ), // Вставляємо картинку
    },
  ];
  const navigate = useNavigate(); // Тепер навігація тут

  return (
    <div className="registrationPagesstepone">
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
      <div className="registrationPagesstepone__block">
        <div className="registrationPagesstepone__text">
          <p className="registrationPagesstepone__text-upper">
            Enter Your Phone Number
          </p>
          <p className="registrationPagesstepone__text-down">
            Please confirm your country code and enter your phone number
          </p>
        </div>
        <div className="registrationPagesstepone__input">
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": {
                m: 1,
                width: "74px",
                marginTop: "25px",
              },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                id="outlined-select-currency"
                select
                sx={{
                  backgroundColor: "var(--neutral-dark)", // фон
                  width: "74px", // ширина
                  borderRadius: "4px",
                  "& .MuiSelect-select": {
                    display: "flex",
                    alignItems: "center", // вирівнює контент по вертикалі
                    height: "100%", // забирає зайвий простір
                  },
                }}
                defaultValue="+62"
              >
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </Box>
          <Box
            component="form"
            sx={{
              backgroundColor: "var(--neutral-dark)", // фон
              width: "245px", // ширина
              height: "36px", // висота
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
                width: "245px", // ширина
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
              id="outlined-basic"
              label="Phone Number"
              variant="outlined"
            />
          </Box>
        </div>
        <div className="registrationPagesstepone__button">
          <ButtonBlue
            onClick={() => navigate("/registrationStep3Telephone")}
            textButton="Continue"
          />
        </div>
      </div>
    </div>
  );
}

export default RegistrationPagesStepOneTelephone;
