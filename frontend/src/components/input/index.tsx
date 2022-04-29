import React from "react";

interface InputProps {
  label: string;
}

const Input = ({ label }: InputProps) => {
  return (
    <div className="input-wrapper">
      <label className="label">{label}</label>
      <input className="input" />
      <img src="/icons/account.svg" alt="ícone de usuário" />
    </div>
  );
};

export default Input;
