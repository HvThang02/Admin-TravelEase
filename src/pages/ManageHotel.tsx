import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import { api } from "../configs/Api";
import axios from "axios";
import { ConfigProvider, Table } from "antd";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
  },
  {
    title: "Name",
    dataIndex: "hotel_name",
    render: (text: string, record: any) => (
      <Link to={`/manage-hotel/${record.id}`}>{text}</Link>
    ),
  },

  {
    title: "Phone",
    dataIndex: "hotel_contact_number",
  },
  {
    title: "Registrar",
    dataIndex: "hotel_contact_number",
  },
];

export default function ManageHotel() {
  const [dataHotel, setDataHotel] = useState<
    {
      id: string;
      hotel_contact_number: any;
      hotel_name: string;
      user: {
        fullname: string;
      };
    }[]
  >([]);

  useEffect(() => {
    const fetchDataHotel = async () => {
      try {
        const response = await axios.get(`${api}/approve-hotels`);
        const data = await response.data;
        setDataHotel(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchDataHotel();
  }, []);

  return (
    <>
      <Header pageTitle="Manage Account" />
      <div className="flex">
        <SideBar />
        <div className=" bg-secondary h-fit p-5 w-full pl-[240px] pt-[90px]">
          <div className=" bg-white py-8 flex flex-col gap-3 px-12">
            <p className=" w-full  text-2xl">Manage Hotel</p>
            <div className=" w-full flex border-b-[1px] border-black p-3 items-center">
              <input
                type="text"
                placeholder="Search Name Hotel Facility"
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
              <Table columns={columns} dataSource={dataHotel} size="small" />
            </ConfigProvider>
          </div>
        </div>
      </div>
    </>
  );
}
