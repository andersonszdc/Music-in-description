import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button";
import Input from "../../components/input";
import { SigninWrapper } from "./styles";

const SignIn = () => {
  const navigate = useNavigate();
  return (
    <SigninWrapper>
      <h1 className="title">
        Login<span className="dot">.</span>
      </h1>
      <h2 className="subtitle">
        Aren't you a Member?{" "}
        <span onClick={() => navigate("/sign-up")} className="to-signup">
          Create account
        </span>
      </h2>
      <form className="form">
        <Input label="Email" />
        <Input label="Password" />
        <Button className="btn-login" text="Login" />
      </form>
    </SigninWrapper>
  );
};

export default SignIn;
