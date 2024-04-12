import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import axios from "axios";
import { api } from "../constants/api";
import { CiSearch, CiCirclePlus } from "react-icons/ci";
import { HiOutlineTrash } from "react-icons/hi2";

import {
  ConfigProvider,
  Modal,
  Upload,
  GetProp,
  UploadFile,
  UploadProps,
  Input,
  Select,
  List,
  Skeleton,
  Button,
  Divider,
} from "antd";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export default function RoomFacility() {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <button className="flex items-center gap-2" type="button">
      <div>Icon</div>
      <CiCirclePlus className="w-full" />
    </button>
  );

  const [roomFacilityData, setRoomFacilityData] = useState<DataType[]>([]);
  const [roomFacilityInput, setRoomFacilityInput] = useState("");

  useEffect(() => {
    const fetchFacilityType = async () => {
      try {
        const response = await axios.get(`${api}/room-facility`);
        const data = response.data;
        setRoomFacilityData(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchFacilityType();
  }, []);

  const [selectedValue, setSelectedValue] = useState("Search to Select");

  const handleChangeFacilityType = (value) => {
    setSelectedValue(value);
  };

  console.log(selectedValue);

  const addNewRoomFacility = async () => {
    try {
      const response = await axios.post<DataType>(`${api}/room-facility`, {
        room_facility_name: roomFacilityInput,
        room_facility_icon:
          "https://theme.hstatic.net/1000340570/1000964732/14/icon-favorite.svg?v=3992",
        facility_type_name: selectedValue,
      });
      const newRoomFacility = response.data;
      setRoomFacilityData((prevData) => [...prevData, newRoomFacility]);
      setRoomFacilityInput("");
      setFileList([]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const deleteFacilityType = async (id: string) => {
    try {
      await axios.delete(`${api}/room-facility/${id}`);
      setRoomFacilityData(roomFacilityData.filter((type) => type.id !== id));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [facilityType, setFacilityType] = useState<
    { id: string; facility_type_name: string }[]
  >([]);

  const filterOption = facilityType.map((type) => {
    return { value: type.facility_type_name, label: type.facility_type_name };
  });

  useEffect(() => {
    const fetchFacilityType = async () => {
      try {
        const response = await axios.get(`${api}/facility-type`);
        const data = response.data;
        setFacilityType(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchFacilityType();
  }, []);

  interface DataType {
    loading: boolean | undefined;
    id: string;
    room_facility_name: string;
    room_facility_icon: string;
    facility_type_name: string;
  }

  return (
    <>
      <Header pageTitle="Room Facility" />
      <div className="">
        <SideBar />
        <div className="bg-secondary p-5 w-full pl-[240px] pt-[90px] h-[100vh]">
          <div className=" bg-white flex p-6 h-full">
            <div className=" w-1/2 px-8">
              <p className="items-center justify-center flex font-normal text-2xl w-full  p-2">
                Add Room Facility
              </p>
              <div className="py-4 flex gap-3">
                <div className=" flex">
                  <ConfigProvider
                    theme={{
                      token: {
                        marginXS: 0,
                      },
                    }}
                  >
                    <Upload
                      action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                      listType="picture-card"
                      fileList={fileList}
                      onPreview={handlePreview}
                      onChange={handleChange}
                      accept=".png"
                    >
                      {fileList.length == 1 ? null : uploadButton}
                    </Upload>
                  </ConfigProvider>

                  <Modal
                    open={previewOpen}
                    title={previewTitle}
                    footer={null}
                    onCancel={handleCancel}
                  >
                    <img alt="example" className=" w-full" src={previewImage} />
                  </Modal>
                </div>
                <div className="flex flex-col w-full gap-2">
                  <Input
                    placeholder="Type Room Facility"
                    value={roomFacilityInput}
                    onChange={(e) => setRoomFacilityInput(e.target.value)}
                    className="h-1/2"
                  />
                  <Select
                    showSearch
                    optionFilterProp="children"
                    options={filterOption.map((option, index) => ({
                      ...option,
                      key: index,
                    }))}
                    value={selectedValue}
                    onChange={handleChangeFacilityType}
                    className="h-1/2"
                  />
                </div>
              </div>
              <button
                className=" w-full bg-green text-white items-center flex justify-center rounded-md p-4"
                onClick={addNewRoomFacility}
              >
                <p>ADD</p>
              </button>
            </div>
            <div className="w-1/2 px-8 border-l-[1px] border-stroke">
              <div className="w-full">
                <p className="font-normal text-2xl w-full px-2 pb-2">
                  List Room Facility
                </p>
                <div className=" w-full flex border-b-[1px] border-black p-3 items-center">
                  <input
                    type="text"
                    placeholder="Search Name Room Facility"
                    className="w-full outline-none text-sm"
                  />
                  <CiSearch />
                </div>

                <div id="scrollableDiv" className="h-[74vh] overflow-auto px-3">
                  <ConfigProvider
                    theme={{
                      token: {
                        lineWidth: 0,
                      },
                    }}
                  >
                    <List
                      dataSource={roomFacilityData}
                      renderItem={(item) => (
                        <List.Item key={item.id}>
                          <List.Item.Meta
                            title={
                              <div className="flex gap-2">
                                <div>{item.room_facility_name}</div>
                                <span>-</span>
                                {/* <div>{item.facility_type_name}</div> */}
                                <div>Hotel Attachment</div>
                              </div>
                            }
                            avatar={
                              <img
                                // src={item.room_facility_icon}
                                src="https://theme.hstatic.net/1000340570/1000964732/14/icon-favorite.svg?v=3992"
                                alt={item.id}
                              />
                            }
                          />
                          <HiOutlineTrash
                            className="cursor-pointer"
                            onClick={() => deleteFacilityType(item.id)}
                          />
                        </List.Item>
                      )}
                    />
                  </ConfigProvider>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
