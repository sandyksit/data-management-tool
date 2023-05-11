import React from "react";
import { Route, Routes } from "react-router-dom";
import AppContent from "components/layout/app-content";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<AppContent />} />
    </Routes>
  );
};

export default Routers;
