import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import ApproveHotel from "./pages/ApproveHotel";
import DetailHotel from "./pages/DetailApproveHotel";
import FacilityType from "./pages/FacilityType";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/approve-hotel/:id" element={<DetailHotel />} />
      <Route path="/approve-hotel" element={<ApproveHotel />} />
      <Route path="/facility-type" element={<FacilityType />} />
    </Routes>
  );
}
