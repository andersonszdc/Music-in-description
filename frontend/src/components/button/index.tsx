import React from "react";
import { ButtonWrapper } from "./styles";

interface ButtonProps {
  text: string;
}

const Button = ({ text }: ButtonProps) => {
  return <ButtonWrapper>{text}</ButtonWrapper>;
};

export default Button;
