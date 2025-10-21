import { ButtonBlue } from "../components/ui/ButtonBlue";
import React from "react";
import "../style/pages/registrationPages.css";
import { useNavigate } from "react-router-dom";
export const RegistrationPages = () => {
  const navigate = useNavigate();
  return (
    <div className="registration">
      <div className="registration-container">
        <div className="registration-illustration">
          <img
            className="registration-illustration__img"
            src="src/assets/Illustration.svg"
            alt="people messaging"
          />
          <p className="registration-illustration__text">
            Connect easily with your family and friends over countries
          </p>
        </div>
        <div className="registration-button">
          <p className="registration-button__policy">Terms & Privacy Policy</p>
          <ButtonBlue
            textButton="Start Messaging"
            onClick={() => navigate("/registrationStep1")}
          />
        </div>
      </div>
    </div>
  );
};
