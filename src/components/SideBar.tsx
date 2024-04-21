import React, { useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { CiBoxList } from "react-icons/ci";
import { IoMdCheckboxOutline } from "react-icons/io";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { MdManageSearch } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { RiShutDownLine } from "react-icons/ri";
import logo from "../assets/logo.png";
import { routePaths } from "../constants/routePaths";

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
    navigate(routePaths.APPROVE_HOTEL);
  };

  const handlePageChangeFacilityType = () => {
    navigate(routePaths.FACILITY_TYPE);
  };

  const handlePageChangeHotelFacility = () => {
    navigate(routePaths.FACILITIES);
  };
  const handlePageChangeRoomFacility = () => {
    navigate(routePaths.ROOM_FACILITY);
  };

  const handlePageChangeDashboard = () => {
    navigate(routePaths.DASHBOARD);
  };

  const handlePageChangeManageAccount = () => {
    navigate(routePaths.MANAGE_ACCOUNT);
  };

  const handlePageChangeManageHotel = () => {
    navigate(routePaths.MANAGE_HOTEL);
  };
  return (
    <aside className="bg-white text-black w-[220px] fixed drop-shadow-md z-20 h-full flex flex-col items-center">
      <img src={logo} className="w-[120px] h-[120px] flex items-center " />
      <ul className="p-2 space-y-2 w-full">
        <li
          className={`${
            location.pathname.startsWith(routePaths.APPROVE_HOTEL)
              ? "bg-secondary text-primary"
              : ""
          } py-2 px-4 hover:bg-secondary hover:text-primary cursor-pointer`}
          onClick={handlePageChangeApproveHotel}
        >
          <div className="flex items-center space-x-3">
            <IoMdCheckboxOutline />
            <p className="text-sm">Approve Hotel</p>
          </div>
        </li>
        <li
          className={`${
            location.pathname === routePaths.DASHBOARD
              ? "bg-secondary text-primary"
              : ""
          } py-2 px-4 hover:bg-secondary hover:text-primary cursor-pointer`}
          onClick={handlePageChangeDashboard}
        >
          <div className="flex items-center space-x-3">
            <MdOutlineSpaceDashboard />
            <p className="text-sm">Dashboard</p>
          </div>
        </li>

        <li
          className={`${
            location.pathname == routePaths.MANAGE_ACCOUNT ||
            location.pathname == routePaths.MANAGE_HOTEL
              ? "bg-secondary text-primary"
              : ""
          } py-2 px-4 hover:bg-secondary hover:text-primary cursor-pointer flex items-center justify-between`}
          onClick={toggleManage}
        >
          <div className="flex items-center space-x-3">
            <MdManageSearch />
            <p className="text-sm">Manage</p>
          </div>
          <MdKeyboardArrowRight
            className={`transition-transform transform ${
              isManageOpen ? "rotate-90" : ""
            }`}
          />
        </li>

        {isManageOpen && (
          <ul className="ml-12 ">
            <li
              className={`${
                location.pathname.startsWith(routePaths.MANAGE_HOTEL)
                  ? " text-primary"
                  : ""
              } pb-2 pt-1 hover:text-primary cursor-pointer text-xs`}
              onClick={handlePageChangeManageHotel}
            >
              Hotel
            </li>
            <li
              className={`${
                location.pathname.startsWith(routePaths.MANAGE_ACCOUNT)
                  ? " text-primary"
                  : ""
              } pb-2 pt-1 hover:text-primary cursor-pointer text-xs`}
              onClick={handlePageChangeManageAccount}
            >
              Account
            </li>
          </ul>
        )}

        <li
          className={`${
            location.pathname == routePaths.FACILITY_TYPE ||
            location.pathname == routePaths.FACILITIES
              ? "bg-secondary text-primary"
              : ""
          } py-2 px-4 hover:bg-secondary hover:text-primary cursor-pointer flex items-center justify-between`}
          onClick={toggleFacility}
        >
          <div className="flex items-center space-x-3">
            <CiBoxList />
            <p className="text-sm">Facility</p>
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
                location.pathname.startsWith(routePaths.FACILITY_TYPE)
                  ? " text-primary"
                  : ""
              } pb-2 pt-1 hover:text-primary cursor-pointer text-xs`}
              onClick={handlePageChangeFacilityType}
            >
              Facility Type
            </li>
            <li
              className={`${
                location.pathname.startsWith(routePaths.FACILITIES)
                  ? " text-primary"
                  : ""
              } pb-2 pt-1 hover:text-primary cursor-pointer text-xs`}
              onClick={handlePageChangeHotelFacility}
            >
              List Facility
            </li>
          </ul>
        )}

        <li
          className={`py-2 px-4 hover:bg-secondary hover:text-primary cursor-pointer`}
        >
          <div className="flex items-center space-x-3">
            <RiShutDownLine />
            <p className=" text-sm">Log out</p>
          </div>
        </li>
      </ul>
    </aside>
  );
}
