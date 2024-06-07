import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import { api } from "../constants/api";
import axios from "axios";
import { ConfigProvider, Table } from "antd";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";

const columns = [
  {
    title: "ID",
    dataIndex: "hotelId",
  },
  {
    title: "Name",
    dataIndex: "hotelName",
  },

  {
    title: "Phone",
    dataIndex: "hotelContactNumber",
  },
  {
    title: "Registrar",
    dataIndex: "owner",
  },
];

interface DataHotel {
  hotelId: string;
  hotelContactNumber: any;
  hotelName: string;
  owner: string;
}

export default function ManageHotel() {
  const [dataHotel, setDataHotel] = useState<DataHotel[]>([]);

  const [searchValue, setSearchValue] = useState("");

  const searchData = dataHotel.filter((item) =>
    item.hotelName.toLowerCase().includes(searchValue.toLowerCase().trim())
  );

  const fetchDataHotel = async () => {
    try {
      const response = await axios.get(`${api}/approve-hotels`);
      const reponseData = await response.data;
      setDataHotel(reponseData.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchDataHotel();
  }, []);

  return (
    <>
      <Header pageTitle="Manage Hotel" />
      <div className="flex">
        <SideBar />
        <div className=" bg-secondary h-fit p-5 w-full pl-[240px] pt-[90px]">
          <div className=" bg-white py-6 flex flex-col gap-3 px-8">
            <p className=" w-full  text-2xl">Manage Hotel</p>
            <div className=" w-full flex border-b-[1px] border-black p-3 items-center">
              <input
                type="text"
                placeholder="Search Name Hotel"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full outline-none text-sm"
              />
              <CiSearch />
            </div>

            <ConfigProvider
              theme={{
                token: {
                  lineHeight: 2,
                },
              }}
            >
              <Table
                columns={columns}
                dataSource={searchData.map((item) => ({
                  ...item,
                  key: item.hotelId,
                }))}
                size="small"
              />
            </ConfigProvider>
          </div>
        </div>
      </div>
    </>
  );
}
