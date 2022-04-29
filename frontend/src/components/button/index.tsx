import React from "react";
import "./styles.css";

interface ButtonProps {
  text: string;
}

const Button = ({ text }: ButtonProps) => {
  return <button className="button">{text}</button>;
};

export default Button;
