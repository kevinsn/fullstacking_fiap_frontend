import React from "react";

import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import Form from "./pages/Tasks/Forms";
import Detail from "./pages/Tasks/Detail";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Tasks />} />
      <Route path="/cadastro" element={<Form />} />
      <Route path="/cadastro/:id" element={<Form />} />
      <Route path="/:id" element={<Detail />} />
    </Routes>
  );
};

export default AppRoutes;