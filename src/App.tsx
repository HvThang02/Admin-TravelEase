import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import ApproveHotel from "./pages/ApproveHotel";
import DetailHotel from "./pages/DetailApproveHotel";
import FacilityType from "./pages/FacilityType";
import HotelFacility from "./pages/HotelFacility";
import RoomFacility from "./pages/RoomFacility";
import DashBoard from "./pages/DashBoard";
import ManageHotel from "./pages/ManageHotel";
import ManageAccount from "./pages/ManageAccount";
import DetailManageHotel from "./pages/DetailManageHotel";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/approve-hotel/:id" element={<DetailHotel />} />
      <Route path="/approve-hotel" element={<ApproveHotel />} />
      <Route path="/facility-type" element={<FacilityType />} />
      <Route path="/hotel-facility" element={<HotelFacility />} />
      <Route path="/room-facility" element={<RoomFacility />} />
      <Route path="/dashboard" element={<DashBoard />} />
      <Route path="/manage-hotel" element={<ManageHotel />} />
      <Route path="/manage-account" element={<ManageAccount />} />
      <Route path="/manage-hotel/:id" element={<DetailManageHotel />} />
    </Routes>
  );
}
