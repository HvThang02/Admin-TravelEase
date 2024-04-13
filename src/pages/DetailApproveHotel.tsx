import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import SideBar from "../components/SideBar";
import Header from "../components/Header";

import { Tooltip } from "react-tooltip";
import Modal from "antd/es/modal/Modal";

//icon
import { FaCheck } from "react-icons/fa6";
import { IoBanSharp } from "react-icons/io5";
import { Result } from "antd";

import { API_IMAGE, API } from "../constants/api";

export default function DetailApproveHotel() {
  const navigate = useNavigate();

  const { hotel_id } = useParams();
  const [dataHotel, setDataHotel] = useState({
    hotel_id: "",
    hotel_name: "",
    hotel_address: "",
    hotel_contact_number: "",
    check_in: "",
    check_out: "",
    description: "Luxurious hotel in the heart of downtown",
    hotel_images: [""],
    hotel_facilities: [{ facility_name: "", facility_image: "" }],
    policy: "",
    rooms: [
      {
        room_id: "",
        room_type_name: "",
        room_quantity: "",
        room_price: "",
        room_facilities: [
          { facility_id: "", facility_name: "", facility_images: "" },
        ],
        room_images: [""],
      },
    ],
    user: {
      id: "",
      full_name: "",
      email: "",
      phone: "",
    },

    id_card: {
      id: "",
      back: "",
      front: "",
    },
  });

  const [approveAlert, setApproveAlert] = useState(false);
  const [rejectAlert, setRejectAlert] = useState(false);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await axios.get(`${API}/approval-hotel/${hotel_id}`);
        const data = response.data;
        setDataHotel(data.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchHotel();
  }, [hotel_id]);

  const handleApproveHotel = async () => {
    try {
      const response = await axios.post(
        `${API}/approval-hotel/approve/${hotel_id}`
      );
      if (response.status === 200) {
        console.log("Hotel approved successfully");
        setApproveAlert(true);
      } else {
        console.error(
          `Failed to approve hotel. Status code: ${response.status}`
        );
      }
    } catch (error) {
      console.error(`Error during hotel approval: ${error.message}`);
    }
  };

  const handleRejectHotel = async () => {
    try {
      const response = await axios.post(
        `${API}/approval-hotel/reject/${hotel_id}`
      );
      if (response.status === 200) {
        console.log("Hotel rejected successfully");
        setRejectAlert(true);
      } else {
        console.error(
          `Failed to approve hotel. Status code: ${response.status}`
        );
      }
    } catch (error) {
      console.error(`Error during hotel approval: ${error.message}`);
    }
  };

  const handleGoBack = () => {
    navigate(`/approval-hotel`);
  };

  if (!dataHotel) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header pageTitle="Approve Hotel" />
      <div className="flex">
        <SideBar />
        <div className=" bg-secondary h-fit p-5 w-full pl-[240px] pt-[90px]">
          <div className="bg-white px-9 py-8">
            <p className="font-semibold text-2xl pb-2">Hotel Information</p>
            <div className="flex w-[max-content]">
              <div className="">
                <div className="flex border-b-2 pb-4 pt-4">
                  <p className="w-[50vh]">Hotel Name</p>
                  <p className="w-[70vh]">{dataHotel.hotel_name || "Empty"}</p>
                </div>
                <div className="flex border-b-2 pb-4 pt-4">
                  <p className="w-[50vh]">Address</p>
                  <p className="w-[70vh]">
                    {dataHotel.hotel_address || "Empty"}
                  </p>
                </div>
                {/* <div className="flex border-b-2 pb-4 pt-4">
                  <h2 className="w-[50vh]">Rooms</h2>
                  <ul className="w-[70vh]">
                    {dataHotel.rooms.map((room, index) => (
                      <div
                        key={index}
                        className=" pb-3 pt-2 space-y-2 border-b-[1px]"
                      >
                        <div className="flex space-x-2 font-medium">
                          <h3>{room.room_type_name}</h3>
                        </div>
                        <h3>{room.room_quantity} rooms</h3>

                        <p className="">Facility: </p>
                        <div className="overflow-y-auto h-[15vh] overflow-x-hidden hotel-facility-scrollbar ">
                          <div className="grid grid-cols-3 gap-3 w-[max-content] pr-2">
                            {room.room_facilities.map((facility, index) => (
                              <div
                                key={index}
                                className="w-[20vh] items-center flex border p-2 rounded gap-2"
                              >
                                <img
                                  src={api_image + facility.facility_images}
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
                    ))}
                  </ul>
                </div> */}

                <div className="flex border-b-2 pb-4 pt-4">
                  <h2 className="w-[50vh]">Check-In Check-Out Time</h2>
                  <div className="flex w-[70vh] gap-1">
                    <div className="">{dataHotel.check_in}</div>
                    <span>-</span>
                    <div className="">{dataHotel.check_out}</div>
                  </div>
                </div>

                <div className="flex border-b-2 pb-4 pt-4">
                  <h2 className="w-[50vh]">Hotel Facility</h2>
                  <div className="overflow-y-auto h-[30vh] overflow-x-hidden hotel-facility-scrollbar ">
                    <div className="grid grid-cols-3 gap-3 w-[max-content] pr-2">
                      {dataHotel.hotel_facilities.map((facility, index) => (
                        <div
                          key={index}
                          className="w-[20vh] items-center flex border p-2 rounded gap-2"
                        >
                          <img
                            src={API_IMAGE + facility.facility_image}
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
                    {dataHotel.hotel_images.map((image, index) => (
                      <img
                        key={index}
                        src={API_IMAGE + image}
                        alt={`Hotel Image ${index + 1}`}
                        className="h-[20vh] object-cover rounded-md"
                      />
                    ))}
                  </div>
                </div>

                {/* <div>
                  {dataHotel.rooms.map((room, index) => (
                    <div key={index} className="pb-4 pt-4">
                      <h2 className="w-full text-center pb-2 font-medium gap-2 flex justify-center">
                        <div>{room.room_type_name}</div>
                        <span>-</span>
                        <div>{room.room_quantity} rooms</div>
                      </h2>
                      <h2></h2>
                      <div className="flex space-x-2 overflow-x-auto w-[40vh] facility-scrollbar pb-2">
                        {room.room_images.map((image, imageIndex) => (
                          <img
                            key={imageIndex}
                            src={api_image + image}
                            alt={`Room Image ${imageIndex + 1}`}
                            className="h-[20vh] object-cover rounded-md"
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div> */}
              </div>
            </div>

            <div>
              <p className="font-semibold text-2xl pb-2 pt-10">
                Contact Signatory Information
              </p>
              <div className="flex border-b-2 pb-4 pt-4 w-[120vh]">
                <p className="w-[50vh]">Name</p>
                <p className="w-[70vh]">{dataHotel.user?.full_name}</p>
              </div>
              <div className="flex border-b-2 pb-4 pt-4 w-[120vh]">
                <p className="w-[50vh]">Email</p>
                <p className="w-[70vh]">{dataHotel.user?.email}</p>
              </div>
              <div className="flex border-b-2 pb-4 pt-4 w-[120vh]">
                <p className="w-[50vh]">Phone</p>
                <p className="w-[70vh]">{dataHotel.user?.phone}</p>
              </div>
              <div className="flex border-b-2 pb-4 pt-4 w-[120vh]">
                <h2 className="w-[50vh]">ID Card Images</h2>
                <div className="w-[50vh]">
                  <h2>ID Front</h2>
                  <img
                    // src={dataHotel.id_card.front}
                    alt="ID Front"
                    className="h-[20vh] object-cover rounded-md"
                  />
                </div>
                <div className="ml-5">
                  <h2>ID Back</h2>
                  <img
                    // src={dataHotel.id_card.back}
                    alt="ID Back"
                    className="h-[20vh] object-cover rounded-md"
                  />
                </div>
              </div>
            </div>

            <div className="flex w-full gap-2 mt-4">
              <button
                className="bg-[#DDFFE0] w-full p-3 text-[#00B654] flex items-center justify-center gap-3 transition-all  rounded-sm hover:bg-[#00B654] hover:text-white"
                onClick={handleApproveHotel}
              >
                <FaCheck />
                Approve
              </button>
              <button
                className="bg-[#FFDDDE] w-full p-3 text-primary flex items-center justify-center gap-3 transition-all  rounded-sm hover:bg-primary hover:text-white"
                onClick={handleRejectHotel}
              >
                <IoBanSharp />
                Reject
              </button>
            </div>
            <Modal
              centered
              open={approveAlert}
              closeIcon={false}
              footer={false}
            >
              <div className="flex flex-col justify-center items-center gap-5">
                <div className=" bg-primary p-5 rounded-full w-[90px] h-[90px] items-center flex  justify-center  -mt-14">
                  <FaCheck className="text-white w-full h-full" />
                </div>
                <div className="text-2xl">Approve Successful</div>
                <button
                  onClick={handleGoBack}
                  className="bg-secondary text-primary border-[1px] border-primary p-4 px-6 rounded-lg w-[200px] transition-all hover:bg-primary hover:text-secondary"
                >
                  Go Back
                </button>
              </div>
            </Modal>

            <Modal centered open={rejectAlert} closeIcon={false} footer={false}>
              <div className="flex flex-col justify-center items-center gap-5">
                <div className=" bg-primary p-5 rounded-full w-[90px] h-[90px] items-center flex  justify-center  -mt-14">
                  <FaCheck className="text-white w-full h-full" />
                </div>
                <div className="text-2xl">Reject Successful</div>
                <button
                  onClick={handleGoBack}
                  className="bg-secondary text-primary border-[1px] border-primary p-4 px-6 rounded-lg w-[200px] transition-all hover:bg-primary hover:text-secondary"
                >
                  Go Back
                </button>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
}
