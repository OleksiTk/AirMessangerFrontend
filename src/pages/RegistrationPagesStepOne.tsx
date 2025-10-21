import { ButtonBlue } from "../components/ui/ButtonBlue";
import { useNavigate } from "react-router-dom";

const RegistrationPagesStepOne = () => {
  const navigate = useNavigate();
  return (
    <div className="stepone">
      <h1 className="stepone__text">Registration</h1>
      <h1
        onClick={() => {
          navigate("/login");
        }}
        className="stepone__login-link"
      >
        go to login
      </h1>
      <div className="stepone__button">
        <ButtonBlue
          textButton="Telephone"
          onClick={() => navigate("/registrationStep2Telephone")}
        />
        <p className="stepone__button-seperator">OR</p>
        <ButtonBlue
          textButton="Email"
          onClick={() => navigate("/registrationStep2Email")}
        />
      </div>
    </div>
  );
};

export default RegistrationPagesStepOne;
