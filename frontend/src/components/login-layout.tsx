import React from "react";
import { Outlet } from "react-router-dom";

const LoginLayout = () => {
  return (
    <div>
      <Outlet />
      <div>banner</div>
    </div>
  );
};

export default LoginLayout;
