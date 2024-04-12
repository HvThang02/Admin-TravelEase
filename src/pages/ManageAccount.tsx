import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import { ConfigProvider, Table } from "antd";
import { CiSearch } from "react-icons/ci";
import axios from "axios";
import { api } from "../constants/api";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
  },
  {
    title: "Name",
    dataIndex: "fullname",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Phone",
    dataIndex: "phone_number",
  },
];

export default function ManageAccount() {
  const [dataAccount, setDataAccount] = useState<
    {
      id: string;
      email: string;
      phone_number: string;
      fullname: string;
    }[]
  >([]);

  useEffect(() => {
    const fetchDataHotel = async () => {
      try {
        const response = await axios.get(`${api}/users`);
        const data = await response.data;
        setDataAccount(data);
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
            <p className=" w-full  text-2xl">Manage Account</p>
            <div className=" w-full flex border-b-[1px] border-black p-3 items-center">
              <input
                type="text"
                placeholder="Search Email Account"
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
              <Table columns={columns} dataSource={dataAccount} size="small" />
            </ConfigProvider>
          </div>
        </div>
      </div>
    </>
  );
}
