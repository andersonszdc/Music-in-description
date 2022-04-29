import React from "react";
import { Outlet } from "react-router-dom";

const LoginLayout = () => {
  return (
    <div>
      <div>
        <div>
          <span className="logo" />
          <p>Update description.</p>
        </div>
        <Outlet />
      </div>
      <div>
        <img
          src="/images/login-banner.jpg"
          alt="homem de costas em um local escuro"
        />
      </div>
    </div>
  );
};

export default LoginLayout;
