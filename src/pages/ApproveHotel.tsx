import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import TableHeader from "../components/TableHeader";
import TableRow from "../components/TableRow";
import TableImage from "../components/TableImage";
import { CiCircleCheck, CiCircleRemove } from "react-icons/ci";
import ActionButton from "../components/TableButton";
import { api } from "../configs/Api";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ITEMS_PER_PAGE = 6;

const headers = ["Image", "Name", "Email", "Phone", "Number of room", "Action"];

export default function ApproveHotel() {
  const [currentPage, setCurrentPage] = useState(0);
  const [dataHotel, setDataHotel] = useState<
    {
      id: string;
      status: string;
      hotel_contact_number: any;
      hotel_email: any;
      hotel_name: string;
    }[]
  >([]);

  const [attachment, setAttachment] = useState<
    {
      AttachmentID: string;
      FileUrl: string;
    }[]
  >([]);

  const [hotelAttachment, setHotelAttachment] = useState<
    {
      id: string;
      AttachmentID: string;
      hotel_id: string;
    }[]
  >([]);

  const [rooms, setRooms] = useState<
    {
      id: string;
      room_quantity: number;
      hotel_id: string;
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

    const fetchAttachment = async () => {
      try {
        const response = await axios.get(`${api}/attachment`);
        const data = await response.data;
        setAttachment(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const fetchHotelAttachment = async () => {
      try {
        const response = await axios.get(`${api}/hotel-attachment`);
        const data = await response.data;
        setHotelAttachment(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const fetchDataRoom = async () => {
      try {
        const response = await axios.get(`${api}/rooms`);
        const data = await response.data;
        setRooms(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchDataRoom();
    fetchHotelAttachment();
    fetchAttachment();
    fetchDataHotel();
  }, []);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const hotelsWithAttachmentsAndRooms = dataHotel
    .filter((hotel) => hotel.status === "await")
    .map((hotel) => {
      const hotelAtt = hotelAttachment.find((att) => att.id === hotel.id);

      const att = hotelAtt
        ? attachment.find((a) => a.AttachmentID === hotelAtt.AttachmentID)
        : null;

      const hotelRooms = rooms.filter((r) => r.id === hotel.id);

      const totalRoomQuantity = hotelRooms.reduce(
        (sum, room) => sum + Number(room.room_quantity),
        0
      );

      return {
        ...hotel,
        FileUrl: att ? att.FileUrl : null,
        room_quantity: totalRoomQuantity,
      };
    });

  const paginatedData = hotelsWithAttachmentsAndRooms.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );
  const navigate = useNavigate();

  const handleDetailApprove = (id: string) => {
    navigate(`/approve-hotel/${id}`);
  };

  return (
    <>
      <Header pageTitle="Approve Hotel" />

      <div className="flex">
        <SideBar />
        <div className=" bg-secondary h-fit p-5 w-full pl-[240px] pt-[90px]">
          <div className=" bg-white p-6">
            <p className=" w-full  text-2xl">Approve Hotel</p>
            <div className="flex flex-col">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-4 sm:px-6 lg:px-8">
                  <div className="overflow-hidden">
                    <table className="min-w-full">
                      <TableHeader headers={headers} />
                      <tbody>
                        {paginatedData.map((item, index) => (
                          <tr
                            className=" border-stroke border-[1px]"
                            key={index}
                          >
                            <TableImage data={item.FileUrl} />
                            <TableRow
                              data={item.hotel_name}
                              onClick={() => handleDetailApprove(item.id)}
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
                              data={item.room_quantity}
                              onClick={undefined}
                            />
                            <td className="px-6 py-4 text-sm font-normal text-black ">
                              <div className="flex justify-between">
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
