import React from "react";
import Header from "../header";
import Footer from "../footer";
import { Outlet } from "react-router-dom";
import "./styles.scss";

const MainLayout: React.FC = () => {
  return (
    <div className="main-layout">
      <Header />
      <main className="outlet">
        <Outlet />
      </main>
      <Footer label="Rodrigo Pintassilgo" />
    </div>
  );
};

export default MainLayout;
