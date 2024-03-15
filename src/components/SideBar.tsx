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

  const handlePageChangeHotelFacility = () => {
    navigate(RoutePaths.HOTEL_FACILITY);
  };
  const handlePageChangeRoomFacility = () => {
    navigate(RoutePaths.ROOM_FACILITY);
  };

  const handlePageChangeDashboard = () => {
    navigate(RoutePaths.DASHBOARD);
  };

  const handlePageChangeManageAccount = () => {
    navigate(RoutePaths.MANAGE_ACCOUNT);
  };

  const handlePageChangeManageHotel = () => {
    navigate(RoutePaths.MANAGE_HOTEL);
  };
  return (
    <aside className="bg-white text-black w-[220px] fixed drop-shadow-md z-10 pt-[75px] h-full">
      <ul className="p-2 space-y-2 ">
        <li
          className={`${
            location.pathname === RoutePaths.DASHBOARD
              ? "bg-secondary text-primary"
              : ""
          } py-2 px-4 hover:bg-secondary hover:text-primary cursor-pointer`}
          onClick={handlePageChangeDashboard}
        >
          <div className="flex items-center space-x-3">
            <MdOutlineSpaceDashboard />
            <p className="text-[2vh]">Dashboard</p>
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
            <p className="text-[2vh]">Approve Hotel</p>
          </div>
        </li>

        <li
          className={`${
            location.pathname == RoutePaths.MANAGE_ACCOUNT ||
            location.pathname == RoutePaths.MANAGE_HOTEL
              ? "bg-secondary text-primary"
              : ""
          } py-2 px-4 hover:bg-secondary hover:text-primary cursor-pointer flex items-center justify-between`}
          onClick={toggleManage}
        >
          <div className="flex items-center space-x-3">
            <MdManageSearch />
            <p className="text-[2vh]">Manage</p>
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
                location.pathname.startsWith(RoutePaths.MANAGE_HOTEL)
                  ? " text-primary"
                  : ""
              } pb-2 pt-1 hover:text-primary cursor-pointer text-sm`}
              onClick={handlePageChangeManageHotel}
            >
              Hotel
            </li>
            <li
              className={`${
                location.pathname.startsWith(RoutePaths.MANAGE_ACCOUNT)
                  ? " text-primary"
                  : ""
              } pb-2 pt-1 hover:text-primary cursor-pointer text-sm`}
              onClick={handlePageChangeManageAccount}
            >
              Account
            </li>
          </ul>
        )}

        <li
          className={`${
            location.pathname == RoutePaths.FACILITY_TYPE ||
            location.pathname == RoutePaths.HOTEL_FACILITY
              ? "bg-secondary text-primary"
              : ""
          } py-2 px-4 hover:bg-secondary hover:text-primary cursor-pointer flex items-center justify-between`}
          onClick={toggleFacility}
        >
          <div className="flex items-center space-x-3">
            <CiBoxList />
            <p className="text-[2vh]">Facility</p>
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
            <li
              className={`${
                location.pathname.startsWith(RoutePaths.HOTEL_FACILITY)
                  ? " text-primary"
                  : ""
              } pb-2 pt-1 hover:text-primary cursor-pointer text-sm`}
              onClick={handlePageChangeHotelFacility}
            >
              Hotel Facility
            </li>
            <li
              className={`${
                location.pathname.startsWith(RoutePaths.ROOM_FACILITY)
                  ? " text-primary"
                  : ""
              } pb-2 pt-1 hover:text-primary cursor-pointer text-sm`}
              onClick={handlePageChangeRoomFacility}
            >
              Room Facility
            </li>
          </ul>
        )}
      </ul>
    </aside>
  );
}
