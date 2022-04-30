import React from "react";
import { ButtonWrapper } from "./styles";

interface ButtonProps {
  text: string;
  className?: string;
}

const Button = ({ text, className }: ButtonProps) => {
  return <ButtonWrapper className={className}>{text}</ButtonWrapper>;
};

export default Button;
