import React from "react";
import Button from "../../components/button";
import Input from "../../components/input";
import { SigninWrapper } from "./styles";

const SignIn = () => {
  return (
    <SigninWrapper>
      <h1>
        Login<span>.</span>
      </h1>
      <h2>
        Aren't you a Member? <span>Create account</span>
      </h2>
      <form>
        <Input label="Email" />
        <Input label="Password" />
        <Button text="Login" />
      </form>
    </SigninWrapper>
  );
};

export default SignIn;
