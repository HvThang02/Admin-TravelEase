import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import axios from "axios";
import { api } from "../constants/api";

//icon
import { HiOutlineTrash } from "react-icons/hi2";
import { FiEdit3 } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";

const ITEMS_PER_PAGE = 10;

interface DataFacilityType {
  facility_type_id: number;
  facility_type_name: string;
}

export default function FacilityType() {
  const [currentPage, setCurrentPage] = useState(0);
  const [facilityTypeData, setFacilityTypeData] = useState<DataFacilityType[]>(
    []
  );

  const [facilityTypeValue, setFacilityTypeValue] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [editingFacilityTypeName, setEditingFacilityTypeName] = useState("");
  const [editingFacilityTypeId, setEditingFacilityTypeId] = useState(0);

  const fetchFacilityType = async () => {
    try {
      const response = await axios.get(`${api}/facility-type`);
      const reponseData = response.data;
      setFacilityTypeData(reponseData.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchFacilityType();
  }, []);

  const paginatedData = facilityTypeData
    .filter((type) => type?.facility_type_name?.includes(searchValue))
    .slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE);

  const handleSearchChange = (e: any) => {
    setSearchValue(e.target.value);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const addNewFacilityType = async () => {
    try {
      await axios.post(`${api}/facility-type/add`, {
        facility_type_name: facilityTypeValue,
      });
      fetchFacilityType();
      setFacilityTypeValue("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const deleteFacilityType = async (id: number) => {
    try {
      await axios.post(`${api}/facility-type/delete/${id}`);
      setFacilityTypeData(
        facilityTypeData.filter((type) => type.facility_type_id !== id)
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const updateFacilityType = async (id: number, newName: string) => {
    try {
      await axios.post(`${api}/facility-type/update/${id}`, {
        facility_type_name: newName,
      });
      const updatedFacilityType = facilityTypeData.find(
        (type) => type.facility_type_id === id
      );
      if (updatedFacilityType) {
        updatedFacilityType.facility_type_name = newName;
        setFacilityTypeData([...facilityTypeData]);
      }

      setIsEditing(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const totalPages = Math.ceil(
    facilityTypeData.filter((type) =>
      type?.facility_type_name?.includes(searchValue)
    ).length / ITEMS_PER_PAGE
  );

  return (
    <>
      <Header pageTitle="Facility Type" />
      <div className="">
        <SideBar />
        <div className="bg-secondary p-5 w-full pl-[240px] pt-[90px]">
          <div className=" bg-white flex p-6">
            <div className="w-1/2 px-8">
              <p className="items-center justify-center flex font-normal text-2xl w-full  p-2">
                {isEditing ? "Update Facility Type" : "Add Facility Type"}
              </p>
              <div className="py-4">
                {isEditing ? (
                  <input
                    placeholder="Type Facility Type"
                    className="w-full p-4 border-stroke border-[1px] rounded-md"
                    value={editingFacilityTypeName}
                    onChange={(e) => setEditingFacilityTypeName(e.target.value)}
                  />
                ) : (
                  <input
                    placeholder="Type Facility Type"
                    className="w-full p-4 border-stroke border-[1px] rounded-md"
                    value={facilityTypeValue}
                    onChange={(e) => setFacilityTypeValue(e.target.value)}
                  />
                )}
              </div>
              {isEditing ? (
                <button
                  className=" w-full bg-[#D3D63F] text-white items-center flex justify-center rounded-md p-4"
                  onClick={() =>
                    updateFacilityType(
                      editingFacilityTypeId,
                      editingFacilityTypeName
                    )
                  }
                >
                  <p>UPDATE</p>
                </button>
              ) : (
                <button
                  className=" w-full bg-green text-white items-center flex justify-center rounded-md p-4"
                  onClick={addNewFacilityType}
                >
                  <p>ADD</p>
                </button>
              )}
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
                    <div
                      className="py-3 flex w-full items-center justify-between"
                      key={type.facility_type_id}
                    >
                      <li
                        key={type.facility_type_id}
                        className="text-sm overflow-ellipsis overflow-hidden whitespace-nowrap w-[100vh]"
                      >
                        {type.facility_type_name}
                      </li>
                      <div className="w-[40px] flex gap-2">
                        <FiEdit3
                          onClick={() => {
                            setIsEditing(true);
                            setEditingFacilityTypeId(type.facility_type_id);
                            setEditingFacilityTypeName(type.facility_type_name);
                          }}
                          className="cursor-pointer"
                        />
                        <HiOutlineTrash
                          onClick={() =>
                            deleteFacilityType(type.facility_type_id)
                          }
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

                {Array(totalPages)
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
                  disabled={currentPage === totalPages - 1}
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
