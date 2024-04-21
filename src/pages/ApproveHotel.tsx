import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import TableHeader from "../components/TableHeader";
import TableRow from "../components/TableRow";
import TableImage from "../components/TableImage";
import { CiCircleCheck, CiCircleRemove } from "react-icons/ci";
import ActionButton from "../components/TableButton";

import { useNavigate } from "react-router-dom";
import axios from "axios";

import { admin_api_image, api } from "../constants/api";

const ITEMS_PER_PAGE = 6;

const headers = ["Image", "Name", "Email", "Phone", "Number of room", "Action"];

export default function ApproveHotel() {
  const [currentPage, setCurrentPage] = useState(0);
  const [dataHotel, setDataHotel] = useState([
    {
      hotel_id: "",
      hotel_name: "",
      hotel_email: "",
      hotel_address: "",
      number_of_rooms: "",
      hotel_contact_number: "",
      hotel_images: "",
    },
  ]);

  // const [attachment, setAttachment] = useState<
  //   {
  //     AttachmentID: string;
  //     FileUrl: string;
  //   }[]
  // >([]);

  // const [hotelAttachment, setHotelAttachment] = useState<
  //   {
  //     id: string;
  //     AttachmentID: string;
  //     hotel_id: string;
  //   }[]
  // >([]);

  // const [rooms, setRooms] = useState<
  //   {
  //     id: string;
  //     room_quantity: number;
  //     hotel_id: string;
  //   }[]
  // >([]);

  useEffect(() => {
    const fetchDataHotel = async () => {
      try {
        const response = await axios.get(`${api}/approval-hotels`);
        const data = await response.data;
        console.log(data);
        setDataHotel(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    // const fetchAttachment = async () => {
    //   try {
    //     const response = await axios.get(`${api}/attachment`);
    //     const data = await response.data;
    //     setAttachment(data);
    //   } catch (error) {
    //     console.error("Error:", error);
    //   }
    // };

    // const fetchHotelAttachment = async () => {
    //   try {
    //     const response = await axios.get(`${api}/hotel-attachment`);
    //     const data = await response.data;
    //     setHotelAttachment(data);
    //   } catch (error) {
    //     console.error("Error:", error);
    //   }
    // };

    // const fetchDataRoom = async () => {
    //   try {
    //     const response = await axios.get(`${api}/rooms`);
    //     const data = await response.data;
    //     setRooms(data);
    //   } catch (error) {
    //     console.error("Error:", error);
    //   }
    // };

    // fetchDataRoom();
    // fetchHotelAttachment();
    // fetchAttachment();
    fetchDataHotel();
  }, []);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // const hotelsWithAttachmentsAndRooms = dataHotel
  //   .filter((hotel) => hotel.status === "await")
  //   .map((hotel) => {
  //     const hotelAtt = hotelAttachment.find((att) => att.id === hotel.id);

  //     const att = hotelAtt
  //       ? attachment.find((a) => a.AttachmentID === hotelAtt.AttachmentID)
  //       : null;

  //     const hotelRooms = rooms.filter((r) => r.id === hotel.id);

  //     const totalRoomQuantity = hotelRooms.reduce(
  //       (sum, room) => sum + Number(room.room_quantity),
  //       0
  //     );

  //     return {
  //       ...hotel,
  //       FileUrl: att ? att.FileUrl : null,
  //       room_quantity: totalRoomQuantity,
  //     };
  //   });

  // const paginatedData = hotelsWithAttachmentsAndRooms.slice(
  //   currentPage * ITEMS_PER_PAGE,
  //   (currentPage + 1) * ITEMS_PER_PAGE
  // );
  const navigate = useNavigate();

  const handleDetailApprove = (id: string) => {
    navigate(`/approval-hotel/${id}`);
  };

  return (
    <>
      <Header pageTitle="Approve Hotel" />

      <div className="flex">
        <SideBar />
        <div className=" bg-gray-100 h-fit p-5 w-full pl-[240px] pt-[90px] flex flex-col gap-4">
          <p className=" w-full text-2xl font-[400]">Approve Hotel</p>
          <div className=" bg-white p-6">
            <div className="flex flex-col">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-4 sm:px-6 lg:px-8">
                  <div className="overflow-hidden">
                    <table className="min-w-full">
                      <TableHeader headers={headers} />
                      <tbody>
                        {dataHotel.map((item, index) => (
                          <tr
                            className=" border-stroke border-[1px]"
                            key={index}
                          >
                            <TableImage data="https://img.freepik.com/free-photo/modern-spacious-room-with-large-panoramic-window_7502-7289.jpg?w=1380&t=st=1710141114~exp=1710141714~hmac=74692f396e2c090c66b23f27a14af3b6ba9e6819b76ccd2445b6d5c0582d260d" />

                            <TableRow
                              data={item.hotel_name}
                              onClick={() => handleDetailApprove(item.hotel_id)}
                            />
                            <TableRow
                              data={item.hotel_email}
                              onClick={undefined}
                            />
                            <TableRow
                              data={item.hotel_contact_number}
                              onClick={undefined}
                            />
                            <TableRow
                              data={item.number_of_rooms}
                              onClick={undefined}
                            />
                            <td className="px-6 py-4 text-sm font-normal text-black ">
                              <div className="flex gap-7">
                                <ActionButton
                                  Icon={CiCircleCheck}
                                  buttonText="Approve"
                                  onClick={() => console.log("Approve clicked")}
                                />
                                <ActionButton
                                  Icon={CiCircleRemove}
                                  buttonText="Reject"
                                  onClick={() => console.log("Reject clicked")}
                                />
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className=" flex justify-end ">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 0}
                  className=" text-xs border-[1px] border-stroke text-black py-2 px-4 rounded-md mx-1 hover:bg-gray_bg"
                >
                  Back
                </button>

                {Array(Math.ceil(dataHotel.length / ITEMS_PER_PAGE))
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
                    Math.ceil(dataHotel.length / ITEMS_PER_PAGE) - 1
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
