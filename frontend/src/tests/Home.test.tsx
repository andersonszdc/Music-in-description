import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../pages/home/index";
import { BrowserRouter, Route, Routes } from "react-router-dom";

test("renders call to action", () => {
  render(
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
  const CallToActionElement = screen.getByText(
    /Update twitter description with currently playing music/i
  );
  expect(CallToActionElement).toBeInTheDocument();
});
