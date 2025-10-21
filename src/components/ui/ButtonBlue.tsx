import React, { useEffect } from "react";
import "../../style/ui/buttonBlue.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const ButtonBlue = ({
  textButton,
  onClick,
}: {
  textButton: string;
  onClick: () => void;
}) => {
  const navigate = useNavigate();
  return (
    <button onClick={onClick} className="button-blue">
      <p className="button-blue__text">{textButton}</p>
    </button>
  );
};
