import React from "react";
import { InputWrapper } from "./styles";

interface InputProps {
  label: string;
}

const Input = ({ label }: InputProps) => {
  return (
    <InputWrapper>
      <label className="label">{label}</label>
      <input className="input" placeholder={label} />
      <img className="icon" src="/icons/account.svg" alt="ícone de usuário" />
    </InputWrapper>
  );
};

export default Input;
