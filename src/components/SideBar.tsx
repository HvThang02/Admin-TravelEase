import React, { useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { CiBoxList } from "react-icons/ci";
import { IoMdCheckboxOutline } from "react-icons/io";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { MdManageSearch } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { RoutePaths } from "../configs/RoutePaths";

export default function SideBar() {
  const location = useLocation();
  const [isFacilityOpen, setIsFacilityOpen] = useState(false);
  const [isManageOpen, setIsManageOpen] = useState(false);

  const toggleFacility = () => {
    setIsFacilityOpen(!isFacilityOpen);
  };

  const toggleManage = () => {
    setIsManageOpen(!isManageOpen);
  };

  const navigate = useNavigate();

  const handlePageChangeApproveHotel = () => {
    navigate(RoutePaths.APPROVE_HOTEL);
  };

  const handlePageChangeFacilityType = () => {
    navigate(RoutePaths.FACILITY_TYPE);
  };
  return (
    <div className="bg-white text-black w-[25vh] h-screen drop-shadow-md fixed z-10">
      <ul className="p-2 pt-[12vh] space-y-2">
        <li
          className={`${
            location.pathname === RoutePaths.DASHBOARD
              ? "bg-secondary text-primary"
              : ""
          } py-2 px-4 hover:bg-secondary hover:text-primary cursor-pointer`}
        >
          <div className="flex items-center space-x-3">
            <MdOutlineSpaceDashboard />
            <p>Dashboard</p>
          </div>
        </li>
        <li
          className={`${
            location.pathname.startsWith(RoutePaths.APPROVE_HOTEL)
              ? "bg-secondary text-primary"
              : ""
          } py-2 px-4 hover:bg-secondary hover:text-primary cursor-pointer`}
          onClick={handlePageChangeApproveHotel}
        >
          <div className="flex items-center space-x-3">
            <IoMdCheckboxOutline />
            <p>Approve Hotel</p>
          </div>
        </li>

        <li
          className="py-2 px-4 hover:bg-secondary hover:text-primary cursor-pointer flex items-center justify-between"
          onClick={toggleManage}
        >
          <div className="flex items-center space-x-3">
            <MdManageSearch />
            <p>Manage</p>
          </div>
          <MdKeyboardArrowRight
            className={`transition-transform transform ${
              isManageOpen ? "rotate-90" : ""
            }`}
          />
        </li>

        {isManageOpen && (
          <ul className="ml-12 ">
            <li className="pb-2 pt-1 hover:text-primary cursor-pointer text-sm">
              Hotel
            </li>
            <li className="pb-2 pt-1 hover:text-primary cursor-pointer text-sm">
              Account
            </li>
          </ul>
        )}

        <li
          className={`${
            location.pathname === RoutePaths.FACILITY_TYPE
              ? "bg-secondary text-primary"
              : ""
          } py-2 px-4 hover:bg-secondary hover:text-primary cursor-pointer flex items-center justify-between`}
          onClick={toggleFacility}
        >
          <div className="flex items-center space-x-3">
            <CiBoxList />
            <p>Facility</p>
          </div>
          <MdKeyboardArrowRight
            className={`transition-transform transform ${
              isFacilityOpen ? "rotate-90" : ""
            }`}
          />
        </li>

        {isFacilityOpen && (
          <ul className="ml-12  ">
            <li
              className={`${
                location.pathname.startsWith(RoutePaths.FACILITY_TYPE)
                  ? " text-primary"
                  : ""
              } pb-2 pt-1 hover:text-primary cursor-pointer text-sm`}
              onClick={handlePageChangeFacilityType}
            >
              Facility Type
            </li>
            <li className="pb-2 pt-1 hover:text-primary cursor-pointer text-sm">
              Hotel Facility
            </li>
            <li className="pb-2 pt-1 hover:text-primary cursor-pointer text-sm">
              Room Facility
            </li>
          </ul>
        )}
      </ul>
    </div>
  );
}
