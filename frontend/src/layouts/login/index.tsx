import React from "react";
import { Outlet } from "react-router-dom";
import { LoginWrapper } from "./styles";
import "./styles.ts";

const LoginLayout = () => {
  return (
    <LoginWrapper>
      <section className="action">
        <div className="logo">
          <span className="logo-img" />
          <p>Update description.</p>
        </div>
        <Outlet />
      </section>
      <section className="banner">
        <img
          className="banner-img"
          src="/images/login-banner.jpg"
          alt="homem de costas em um local escuro"
        />
      </section>
    </LoginWrapper>
  );
};

export default LoginLayout;
