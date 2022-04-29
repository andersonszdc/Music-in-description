import React from "react";
import Button from "../../components/button";
import Input from "../../components/input";

const SignUp = () => {
  return (
    <div>
      <div>
        <p>start for free</p>
        <h1>
          Create new account<span>.</span>
        </h1>
        <h2>
          Already A Member? <span>Log in</span>
        </h2>
        <form>
          <div className="full-name">
            <Input label="First Name" />
            <Input label="Last Name" />
          </div>
          <Input label="Email" />
          <Input label="Password" />
          <Button text="Create account" />
        </form>
      </div>
    </div>
  );
};

export default SignUp;
