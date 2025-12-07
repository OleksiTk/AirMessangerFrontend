import Dither from "../components/background/Dithet";
import LightRays from "../components/background/LightRays";
import { ButtonBlue } from "../components/ui/ButtonBlue";
import "../style/pages/registrationPages.css";
import { useNavigate } from "react-router-dom";
export const RegistrationPages = () => {
  const navigate = useNavigate();
  return (
    <div className="registration">
      <div className="background-registration">
        <div style={{ width: "100%", height: "1000px", position: "relative" }}>
          <LightRays
            raysOrigin="top-center"
            raysColor="#3e4ec1"
            raysSpeed={1.5}
            lightSpread={3}
            rayLength={1.2}
            fadeDistance={3}
            followMouse={true}
            mouseInfluence={0.1}
            noiseAmount={0.1}
            distortion={0.05}
            className="custom-rays"
          />
        </div>
      </div>

      <div className="registration-container">
        <div className="registration-illustration">
          <div className="registration-illustration__img-wrapper">
            <img
              className="registration-illustration__img"
              src="/assets/Illustration.svg"
              alt="people messaging"
            />
            <div className="registration-illustration__img-animation-chats img-animation-chats">
              <div className="img-animation-chats__background-first">
                <div className="img-animation-chats__background-first-dot-one"></div>
                <div className="img-animation-chats__background-first-dot-two"></div>
                <div className="img-animation-chats__background-first-dot-three"></div>
              </div>
              <div className="img-animation-chats__background-two">
                <div className="img-animation-chats__background-two-dot-one"></div>
                <div className="img-animation-chats__background-two-dot-two"></div>
                <div className="img-animation-chats__background-two-dot-three"></div>
              </div>
            </div>
          </div>

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
