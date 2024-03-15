import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import axios from "axios";
import { api } from "../configs/Api";
import { HiOutlineTrash } from "react-icons/hi2";
import { CiSearch } from "react-icons/ci";

const ITEMS_PER_PAGE = 10;

export default function FacilityType() {
  const [currentPage, setCurrentPage] = useState(0);
  const [facilityTypeData, setFacilityTypeData] = useState([
    {
      id: "",
      facility_type_name: "",
    },
  ]);

  useEffect(() => {
    const fetchFacilityType = async () => {
      try {
        const response = await axios.get(`${api}/facility-type`);
        const data = response.data;
        setFacilityTypeData(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchFacilityType();
  }, []);

  const [facilityTypeValue, setFacilityTypeValue] = useState("");

  const addNewFacilityType = async () => {
    try {
      const response = await axios.post(`${api}/facility-type`, {
        facility_type_name: facilityTypeValue,
      });
      const newFacilityType = response.data;
      setFacilityTypeData([...facilityTypeData, newFacilityType]);
      setFacilityTypeValue("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [searchValue, setSearchValue] = useState("");

  const paginatedData = facilityTypeData
    .filter((type) => type.facility_type_name.includes(searchValue))
    .slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const deleteFacilityType = async (id) => {
    try {
      await axios.delete(`${api}/facility-type/${id}`);
      setFacilityTypeData(facilityTypeData.filter((type) => type.id !== id));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Header pageTitle="Facility Type" />
      <div className="">
        <SideBar />
        <div className="bg-secondary p-5 w-full pl-[240px] pt-[90px]">
          <div className=" bg-white flex p-6">
            <div className=" w-1/2 px-8">
              <p className="items-center justify-center flex font-normal text-2xl w-full  p-2">
                Add Facility Type
              </p>
              <div className="py-4">
                <input
                  placeholder="Type Facility Type"
                  className="w-full p-4 border-stroke border-[1px] rounded-md"
                  value={facilityTypeValue}
                  onChange={(e) => setFacilityTypeValue(e.target.value)}
                />
              </div>
              <button
                className=" w-full bg-green text-white items-center flex justify-center rounded-md p-4"
                onClick={addNewFacilityType}
              >
                <p>ADD</p>
              </button>
            </div>
            <div className="w-1/2 px-8 border-l-[1px] border-stroke">
              <div className="w-full">
                <p className="font-normal text-2xl w-full px-2 pb-2">
                  List Facility Types
                </p>
                <div className=" w-full flex border-b-[1px] border-black p-3 items-center">
                  <input
                    type="text"
                    value={searchValue}
                    onChange={handleSearchChange}
                    placeholder="Search Name Facility Type"
                    className="w-full outline-none text-sm"
                  />
                  <CiSearch />
                </div>
                <ul className="py-4 px-2">
                  {paginatedData.map((type) => (
                    <div className="py-3 flex w-full items-center justify-between">
                      <li
                        key={type.id}
                        className="text-sm overflow-ellipsis overflow-hidden whitespace-nowrap w-[100vh]"
                      >
                        {type.facility_type_name}
                      </li>
                      <div className=" w-[30px]">
                        <HiOutlineTrash
                          onClick={() => deleteFacilityType(type.id)}
                          className=" cursor-pointer"
                        />
                      </div>
                    </div>
                  ))}
                </ul>
              </div>
              <div className=" flex justify-center ">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 0}
                  className=" text-xs border-[1px] border-stroke text-black py-2 px-4 rounded-md mx-1 hover:bg-gray_bg"
                >
                  Back
                </button>

                {Array(Math.ceil(facilityTypeData.length / ITEMS_PER_PAGE))
                  .fill(null)
                  .map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handlePageChange(index)}
                      className={` text-xs border-[1px] border-stroke text-black py-2 px-4 rounded-md mx-1 hover:bg-gray_bg ${
                        index === currentPage ? "bg-gray_bg" : ""
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={
                    currentPage ===
                    Math.ceil(facilityTypeData.length / ITEMS_PER_PAGE) - 1
                  }
                  className="text-xs border-[1px] border-stroke text-black py-2 px-4 rounded-md mx-1 hover:bg-gray_bg "
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
