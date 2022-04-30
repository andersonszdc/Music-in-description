import React from "react";
import Button from "../../components/button";
import Input from "../../components/input";
import { SignupWrapper } from "./styles";

const SignUp = () => {
  return (
    <SignupWrapper>
      <p className="notification">start for free</p>
      <h1 className="title">
        Create new account<span className="dot">.</span>
      </h1>
      <h2 className="subtitle">
        Already A Member? <span className="to-signin">Log in</span>
      </h2>
      <form className="form">
        <div className="full-name">
          <Input label="First Name" />
          <Input label="Last Name" />
        </div>
        <Input label="Email" />
        <Input label="Password" />
        <Button text="Create account" />
      </form>
    </SignupWrapper>
  );
};

export default SignUp;
