import { ButtonBlue } from "../components/ui/ButtonBlue";
import { useNavigate } from "react-router-dom";
import "../style/pages/registrationform.css";
import { useEffect, useState } from "react";
import CircularIndeterminate from "../components/ui/CircularIndeterminate";
import { authApi } from "../api/authApi";
import { ToastContainer, toast } from "react-toastify";
const RegistrationPagesStepOne = () => {
  const regex = /^.{20}$/;
  const navigate = useNavigate();
  const [signUp, setSingUp] = useState(true);
  const [signIn, setSingIn] = useState(false);
  const [emailRegister, setEmailRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");
  const [userNameRegister, setUserNameRegister] = useState("");
  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const [loader, setLoader] = useState(false);
  async function Registration() {
    try {
      if (!emailRegister || !passwordRegister || !userNameRegister) {
        toast.warn(`${"please write all fields"}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        return;
      }
      if (regex.test(userNameRegister)) {
        toast.warn(`${"Very big name,please make smaller name"}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        return;
      }
      setLoader(true);
      const registerAccount = await authApi.register(
        emailRegister,
        passwordRegister,
        userNameRegister
      );
      if (registerAccount.check == "ok") {
        console.log(registerAccount);
        setLoader(false);

        navigate("/registrationStepAccount");
      } else {
        setLoader(false);
        toast.warn(`${"Somenthing went wrong"}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        return;
      }
    } catch (error) {
      console.log(error);
      setLoader(false);
    } finally {
      setLoader(false);
    }
  }
  async function Login() {
    if (!emailLogin || !passwordLogin) {
      toast.warn(`${"please write all fields"}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    try {
      setLoader(true);
      const loginToAccount = await authApi.login(emailLogin, passwordLogin);
      if (loginToAccount.check == "ok") {
        console.log("succes you login to your account", loginToAccount);
        navigate("/chats");
      } else {
        setLoader(false);
        toast.warn(`${"Somenthing went wrong"}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        return;
      }
    } catch (error) {
      console.log("something went wrong", error);
      setLoader(false);
    } finally {
      setLoader(false);
      toast.warn(`${"Somenthing went wrong"}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="content">
        <div className="containers">
          <img className="bg-img" src="/assets/39610.jpg" alt="" />
          <div className="menu">
            <a
              onClick={(e) => {
                e.preventDefault();
                setSingUp(true);
                setSingIn(false);
              }}
              className={`btn-enregistrer ${signUp == true ? "" : "active"}`}
            >
              <h2>SIGN UP</h2>
            </a>
            <a
              onClick={(e) => {
                e.preventDefault();
                setSingIn(true);
                setSingUp(false);
              }}
              href=""
              className={`btn-connexion ${signUp == true ? "active" : ""}`}
            >
              <h2>SIGN IN</h2>
            </a>
          </div>
          <div
            className={`connexion ${signUp == true ? "remove-section" : ""}`}
          >
            <div className="contact-form">
              <label>Email</label>
              <input
                value={emailLogin}
                onChange={(e) => setEmailLogin(e.target.value)}
                className="contact-form__input"
                placeholder=""
                type="text"
              />

              <label>PASSWORD</label>
              <input
                value={passwordLogin}
                onChange={(e) => setPasswordLogin(e.target.value)}
                className="contact-form__input"
                placeholder=""
                type="text"
              />

              <input
                onClick={Login}
                className="submit"
                value="SIGN IN"
                type="submit"
              />
            </div>

            <hr />
          </div>

          <div
            className={`enregistrer ${signUp == true ? "" : "active-section"}`}
          >
            <div className="contact-form">
              <label>USERNAME</label>
              <input
                value={userNameRegister}
                onChange={(e) => setUserNameRegister(e.target.value)}
                className="contact-form__input"
                placeholder=""
                type="text"
              />

              <label>E-MAIL</label>
              <input
                value={emailRegister}
                onChange={(e) => setEmailRegister(e.target.value)}
                className="contact-form__input"
                placeholder=""
                type="text"
              />

              <label>PASSWORD</label>
              <input
                value={passwordRegister}
                onChange={(e) => setPasswordRegister(e.target.value)}
                className="contact-form__input"
                placeholder=""
                type="text"
              />

              <div className="check">
                <label>
                  <input id="check" type="checkbox" className="checkbox" />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26px"
                    height="23px"
                  >
                    <path
                      className="path-back"
                      d="M1.5,6.021V2.451C1.5,2.009,1.646,1.5,2.3,1.5h18.4c0.442,0,0.8,0.358,0.8,0.801v18.398c0,0.442-0.357,0.801-0.8,0.801H2.3c-0.442,0-0.8-0.358-0.8-0.801V6"
                    />
                    <path
                      className="path-moving"
                      d="M24.192,3.813L11.818,16.188L1.5,6.021V2.451C1.5,2.009,1.646,1.5,2.3,1.5h18.4c0.442,0,0.8,0.358,0.8,0.801v18.398c0,0.442-0.357,0.801-0.8,0.801H2.3c-0.442,0-0.8-0.358-0.8-0.801V6"
                    />
                  </svg>
                </label>
                <h3>I agree</h3>
              </div>

              <input
                onClick={Registration}
                className="submit"
                value="SIGN UP"
                type="submit"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPagesStepOne;
