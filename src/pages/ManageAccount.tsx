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
    dataIndex: "user_id",
  },
  {
    title: "Name",
    dataIndex: "full_name",
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

interface DataUser {
  user_id: number;
  email: string;
  phone_number: string;
  full_name: string;
  blocked: boolean;
}

export default function ManageAccount() {
  const [dataAccount, setDataAccount] = useState<DataUser[]>([]);

  const [searchValue, setSearchValue] = useState("");

  const searchData = dataAccount.filter(
    (item) =>
      item.email &&
      item.email.toLowerCase().includes(searchValue.toLowerCase().trim())
  );

  const fetchDataHotel = async () => {
    try {
      const response = await axios.get(`${api}/users`);
      const responseData = await response.data;
      setDataAccount(responseData.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
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
                  key: item.user_id,
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
