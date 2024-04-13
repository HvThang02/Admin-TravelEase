import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import { Table } from "antd";
import { CiSearch } from "react-icons/ci";

import type { DatePickerProps, TimePickerProps } from "antd";
import { DatePicker, Select, Space, TimePicker } from "antd";

import axios from "axios";
import { api_image, api } from "../constants/api";

const { Option } = Select;

type PickerType = "time" | "date";

const PickerWithType = ({
  type,
  onChange,
}: {
  type: PickerType;
  onChange: TimePickerProps["onChange"] | DatePickerProps["onChange"];
}) => {
  if (type === "time") return <TimePicker onChange={onChange} />;
  if (type === "date") return <DatePicker onChange={onChange} />;
  return <DatePicker picker={type} onChange={onChange} />;
};

const renderPaymentTransferred = (paymentTransferred: boolean) => {
  const status = paymentTransferred ? "Done" : "Not yet";
  const color = paymentTransferred ? "green" : "red";
  return <span style={{ color: color }}>{status}</span>;
};

const columns = [
  {
    title: "Ticket ID",
    dataIndex: "ticket_id",
  },
  {
    title: "Total Price",
    dataIndex: "total_price",
  },
  {
    title: "Profit",
    dataIndex: "profit",
  },
  {
    title: "Payment Transferred",
    dataIndex: "payment_transferred",
    render: renderPaymentTransferred,
  },
];

interface DataTicket {
  ticket_id: string;
  total_price: string;
  profit: string;
  payment_transferred: boolean;
}

export default function DashBoard() {
  const [type, setType] = useState<PickerType>("time");

  const [ticketData, setTicketData] = useState<DataTicket[]>([]);

  useEffect(() => {
    const fetchDataTicket = async () => {
      try {
        const response = await axios.get(`${api}/ticket`);
        const data = await response.data;
        setTicketData(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchDataTicket();
  }, []);

  return (
    <>
      <Header pageTitle="Approve Hotel" />
      <div className="flex">
        <SideBar />
        <div className=" bg-secondary h-fit p-5 w-full pl-[240px] pt-[90px] flex flex-col gap-4">
          <div className="bg-white w-full p-4">
            <p className="text-2xl w-full font-bold">Business Insights</p>
            <div className="flex items-center w-full justify-between py-6">
              <div className="border-r border-stroke w-full px-12">
                <p className="text-grey">Paid</p>
                <p className=" font-bold text-xl">VND 400,000,000</p>
                <p className="text-grey">This Week</p>
              </div>
              <div className="border-r border-stroke w-full px-12">
                <p className="text-grey">Unpaid</p>
                <p className=" font-bold text-xl">VND 400,000,000</p>
                <p className="text-grey">This Week</p>
              </div>
              <div className=" w-full px-12">
                <p className="text-grey">Profit</p>
                <p className=" font-bold text-xl">VND 400,000,000</p>
                <p className="text-grey">This Week</p>
              </div>
            </div>
          </div>
          <div className="bg-white w-full p-4 flex flex-col gap-2">
            <div className="flex">
              <p className="text-2xl w-full font-bold">Detail</p>
              <div className=" w-full flex border-b-[1px] border-black p-3 items-center">
                <input
                  type="text"
                  placeholder="Search Ticket ID"
                  className="w-full outline-none text-sm"
                />
                <CiSearch />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <p>Date Period:</p>
              <Space>
                <Select value={type} onChange={setType}>
                  <Option value="date">Date</Option>
                  <Option value="week">Week</Option>
                  <Option value="month">Month</Option>
                  <Option value="quarter">Quarter</Option>
                  <Option value="year">Year</Option>
                </Select>
                <PickerWithType
                  type={type}
                  onChange={(value) => console.log(value)}
                />
              </Space>
            </div>
            <Table columns={columns} dataSource={ticketData} />;
          </div>
        </div>
      </div>
    </>
  );
}
