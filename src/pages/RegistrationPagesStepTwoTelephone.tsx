import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function RegistrationPagesStepTwoTelephone() {
  const [phoneNumberOne, setPhoneNumberOne] = useState("");
  const [phoneNumberTwo, setPhoneNumberTwo] = useState("");
  const [phoneNumberThree, setPhoneNumberThree] = useState("");
  const [phoneNumberFour, setPhoneNumberFour] = useState("");
  let navigate = useNavigate();
  const handleChangeOne = (e: any) => {
    setPhoneNumberOne(e.target.value);
    let input = document.querySelectorAll(
      ".registrationpagessteptwotelephone__mainBlock-input-dot"
    )[0];
    if (e.target.value == "" || e.target.value == null) {
      input.classList.remove("input-transparent");
    } else {
      input.classList.add("input-transparent");
    }
  };
  const handleChangeTwo = (e: any) => {
    setPhoneNumberTwo(e.target.value);
    let input = document.querySelectorAll(
      ".registrationpagessteptwotelephone__mainBlock-input-dot"
    )[1];
    if (e.target.value == "" || e.target.value == null) {
      input.classList.remove("input-transparent");
    } else {
      input.classList.add("input-transparent");
    }
  };
  const handleChangeThree = (e: any) => {
    setPhoneNumberThree(e.target.value);
    let input = document.querySelectorAll(
      ".registrationpagessteptwotelephone__mainBlock-input-dot"
    )[2];
    if (e.target.value == "" || e.target.value == null) {
      input.classList.remove("input-transparent");
    } else {
      input.classList.add("input-transparent");
    }
  };
  const handleChangeFour = (e: any) => {
    setPhoneNumberFour(e.target.value);
    let input = document.querySelectorAll(
      ".registrationpagessteptwotelephone__mainBlock-input-dot"
    )[3];
    if (e.target.value == "" || e.target.value == null) {
      input.classList.remove("input-transparent");
    } else {
      input.classList.add("input-transparent");
    }
  };
  useEffect(() => {
    if (phoneNumberFour == "" || phoneNumberFour == null) return;
    handleSubmit();
    navigate("/registrationStepAccount");
  }, [phoneNumberFour]);
  const handleSubmit = () => {
    console.log(
      `Номер телефону: ${phoneNumberOne}${phoneNumberTwo}${phoneNumberThree}${phoneNumberFour}`
    );
  };

  return (
    <div className="registrationpagessteptwotelephone">
      <div className="registrationpagessteptwotelephone__backButton">
        <Link
          to={"/registrationStep2Telephone"}
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
      <div className="registrationpagessteptwotelephone__mainBlock">
        <div className="registrationpagessteptwotelephone__mainBlock-text">
          <p className="registrationpagessteptwotelephone__mainBlock-text-upper">
            Enter Code
          </p>
          <p className="registrationpagessteptwotelephone__mainBlock-text-down">
            We have sent you an SMS with the code to +62 1309 - 1710 - 1920
          </p>
        </div>
        <div className="registrationpagessteptwotelephone__mainBlock-input">
          <form
            className="registrationpagessteptwotelephone__mainBlock-input-form"
            action=""
            onSubmit={handleSubmit}
          >
            <input
              value={phoneNumberOne}
              onChange={handleChangeOne}
              className="registrationpagessteptwotelephone__mainBlock-input-dot"
              type="number"
            />
            <input
              value={phoneNumberTwo}
              onChange={handleChangeTwo}
              className="registrationpagessteptwotelephone__mainBlock-input-dot"
              type="number"
            />
            <input
              value={phoneNumberThree}
              onChange={handleChangeThree}
              className="registrationpagessteptwotelephone__mainBlock-input-dot"
              type="number"
            />
            <input
              value={phoneNumberFour}
              onChange={handleChangeFour}
              className="registrationpagessteptwotelephone__mainBlock-input-dot"
              type="number"
            />
          </form>
        </div>
        <div className="registrationpagessteptwotelephone__mainBlock-button">
          <button className="registrationpagessteptwotelephone__mainBlock-button-resend">
            Resend Code
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegistrationPagesStepTwoTelephone;
