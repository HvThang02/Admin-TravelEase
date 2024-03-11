import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import axios from "axios";
import { api } from "../configs/Api";
import { HiOutlineTrash } from "react-icons/hi2";
import { CiSearch } from "react-icons/ci";

const ITEMS_PER_PAGE = 10;

const FacilityType = () => {
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

  const addNewFacilityType = async () => {
    try {
      const response = await axios.post(`${api}/facility-type`, {
        facility_type_name: "New Facility Type",
      });
      const newFacilityType = response.data;
      setFacilityTypeData([...facilityTypeData, newFacilityType]);
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

  return (
    <div className="bg-secondary h-full w-full flex">
      <Header pageTitle="Facility Type" />
      <SideBar />
      <div className=" bg-white w-[180vh] h-fit mt-[12vh] ml-[27vh] mb-[2vh] px-10 py-5 flex">
        <div className=" w-1/2 px-8">
          <p className="items-center justify-center flex font-normal text-2xl w-full  p-2">
            Add Facility Type
          </p>
          <div className="py-4">
            <input
              placeholder="Type Facility Type"
              className="w-full p-4 border-stroke border-[1px] rounded-md"
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
                className="w-full outline-none "
              />
              <CiSearch />
            </div>
            <ul className="py-4 px-2">
              {paginatedData.map((type) => (
                <div className="py-3 flex w-full justify-between items-center">
                  <li key={type.id} className=" text-lg">
                    {type.facility_type_name}
                  </li>
                  <HiOutlineTrash />
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
  );
};
export default FacilityType;
