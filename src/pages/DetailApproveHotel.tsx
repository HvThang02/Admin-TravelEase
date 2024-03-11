import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { api } from "../configs/Api";
import SideBar from "../components/SideBar";
import Header from "../components/Header";

import { Tooltip } from "react-tooltip";

const DetailApproveHotel = () => {
  const { id } = useParams();
  const [dataHotel, setDataHotel] = useState({
    hotel_name: "",
    hotel_address: "",
    rooms: [
      {
        room_name: "",
        room_quantity: 0,
        room_type_name: "",
        room_facilities: [{ facility_name: "", facility_image: "" }],
        room_image: [""],
      },
    ],
    check_in_time: "",
    check_out_time: "",
    hotel_facilities: [{ facility_name: "", facility_image: "" }],
    user: {
      fullname: "",
      email: "",
      phone_number: "",
      font_id: "",
      back_id: "",
    },
    hotel_image: [""],
  });

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await axios.get(`${api}/approve-hotels/${id}`);
        const data = response.data;
        setDataHotel(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchHotel();
  }, [id]);

  if (!dataHotel) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" bg-secondary flex">
      <Header pageTitle="Approve Hotel" />
      <SideBar />
      <div className=" bg-white  h-fit mt-[12vh] ml-[27vh] mb-[2vh] px-10 py-5 ">
        <div className="bg-white px-9 py-8 ">
          <p className="font-semibold text-2xl pb-2">Hotel Information</p>
          <div className="flex w-[max-content]">
            <div className="">
              <div className="flex border-b-2 pb-4 pt-4">
                <p className="w-[50vh]">Hotel Name</p>
                <p className="w-[70vh]">{dataHotel.hotel_name || "Empty"}</p>
              </div>
              <div className="flex border-b-2 pb-4 pt-4">
                <p className="w-[50vh]">Address</p>
                <p className="w-[70vh]">{dataHotel.hotel_address || "Empty"}</p>
              </div>
              <div className="flex border-b-2 pb-4 pt-4">
                <h2 className="w-[50vh]">Rooms</h2>
                <ul className="w-[70vh]">
                  {dataHotel.rooms.map((room, index) => (
                    <div key={index} className=" pb-3 space-y-2">
                      <div className="flex space-x-2">
                        <h3>{room.room_name}</h3>
                        <span>-</span>
                        <h3>{room.room_type_name}</h3>
                      </div>

                      <h3>{room.room_quantity} rooms</h3>

                      <p className="">Facility: </p>
                      <div className="relative overflow-x-auto pb-2 facility-scrollbar ">
                        <div className="flex whitespace-nowrap gap-3 w-[max-content]">
                          {room.room_facilities.map((facility, index) => (
                            <div
                              key={index}
                              className="items-center flex border p-2 rounded  whitespace-nowrap"
                            >
                              <img
                                src={facility.facility_image}
                                alt=""
                                className="w-6 h-6"
                              />
                              <p className="">{facility.facility_name}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </ul>
              </div>

              <div className="flex border-b-2 pb-4 pt-4">
                <h2 className="w-[50vh]">Check-In Check-Out Time</h2>
                <div className="flex w-[70vh] gap-1">
                  <div className="">{dataHotel.check_in_time}</div>
                  <span>-</span>
                  <div className="">{dataHotel.check_out_time}</div>
                </div>
              </div>

              <div className="flex border-b-2 pb-4 pt-4">
                <h2 className="w-[50vh]">Hotel Facility</h2>
                <div className="overflow-y-auto h-[30vh] overflow-x-hidden hotel-facility-scrollbar ">
                  <div className="grid grid-cols-3 gap-3 w-[max-content] pr-2">
                    {dataHotel.hotel_facilities.map((facility, index) => (
                      <div
                        key={index}
                        className="w-[20vh] items-center flex border p-2 rounded"
                      >
                        <img
                          src={facility.facility_image}
                          alt=""
                          className="w-6 h-6"
                        />
                        <p
                          className="overflow-ellipsis overflow-hidden whitespace-nowrap "
                          data-tooltip-id="my-tooltip"
                          data-tooltip-content={facility.facility_name}
                        >
                          {facility.facility_name}
                        </p>

                        <Tooltip id="my-tooltip" place="bottom" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="ml-5 -mt-14">
              <div className="pb-4 pt-4">
                <h2 className="w-full text-center pb-2 font-medium">
                  Hotel Images
                </h2>
                <div className="flex space-x-2 overflow-x-auto w-[40vh] overflow-hidden facility-scrollbar pb-2">
                  {dataHotel.hotel_image.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Hotel Image ${index + 1}`}
                      className="h-[20vh] object-cover rounded-md"
                    />
                  ))}
                </div>
              </div>

              <div>
                {dataHotel.rooms.map((room, index) => (
                  <div key={index} className="pb-4 pt-4">
                    <h2 className="w-full text-center pb-2 font-medium">
                      {room.room_name || "Empty"} <span> </span> -{" "}
                      <span> </span>
                      {room.room_type_name || "Empty"} - {room.room_quantity}{" "}
                      <span> </span>
                      rooms
                    </h2>
                    <h2></h2>
                    <div className="flex space-x-2 overflow-x-auto w-[40vh] facility-scrollbar pb-2">
                      {room.room_image.map((image, imageIndex) => (
                        <img
                          key={imageIndex}
                          src={image}
                          alt={`Room Image ${imageIndex + 1}`}
                          className="h-[20vh] object-cover rounded-md"
                        />
                      ))}
                      h
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <p className="font-semibold text-2xl pb-2 pt-10">
              Contact Signatory Information
            </p>
            <div className="flex border-b-2 pb-4 pt-4 w-[120vh]">
              <p className="w-[50vh]">Name</p>
              <p className="w-[70vh]">{dataHotel.user.fullname}</p>
            </div>
            <div className="flex border-b-2 pb-4 pt-4 w-[120vh]">
              <p className="w-[50vh]">Email</p>
              <p className="w-[70vh]">{dataHotel.user.email}</p>
            </div>
            <div className="flex border-b-2 pb-4 pt-4 w-[120vh]">
              <p className="w-[50vh]">Phone</p>
              <p className="w-[70vh]">{dataHotel.user.phone_number}</p>
            </div>
            <div className="flex border-b-2 pb-4 pt-4 w-[120vh]">
              <h2 className="w-[50vh]">ID Card Images</h2>
              <div className="w-[50vh]">
                <h2>ID Front</h2>
                <img
                  src={dataHotel.user.font_id}
                  alt="ID Front"
                  className="h-[20vh] object-cover rounded-md"
                />
              </div>
              <div className="ml-5">
                <h2>ID Back</h2>
                <img
                  src={dataHotel.user.back_id}
                  alt="ID Back"
                  className="h-[20vh] object-cover rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailApproveHotel;
