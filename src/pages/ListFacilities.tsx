import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import axios from "axios";
import { admin_api_image, api } from "../constants/api";
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

interface DataFacilities {
  loading: boolean | undefined;
  facility_id: number;
  facility_name: string;
  facility_type: string;
  facility_image: string;
}

interface DataFacilityType {
  facility_type_id: string;
  facility_type_name: string;
}

const ITEMS_PER_PAGE = 9;

export default function HotelFacility() {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [facilityImage, setFacilityImage] = useState<UploadFile[]>([]);

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

  const handleChange = (e) => {
    console.log(e.target.files);
    setFacilityImage(e.target.files[0]);
  };

  const uploadButton = (
    <button className="flex items-center gap-2" type="button">
      <div>Icon</div>
      <CiCirclePlus className="w-full" />
    </button>
  );

  const [facilities, setFacilities] = useState<DataFacilities[]>([]);
  const [facilityType, setFacilityType] = useState<DataFacilityType[]>([]);
  const [hotelFacilityInput, setHotelFacilityInput] = useState("");

  const fetchFacilities = async () => {
    try {
      const response = await axios.get(`${api}/facilities`);
      const reponseData = response.data;
      setFacilities(reponseData.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchFacilityType = async () => {
    try {
      const response = await axios.get(`${api}/facility-type`);
      const reponseData = response.data;
      setFacilityType(reponseData.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [selectedValue, setSelectedValue] = useState("Search to Select");

  const handleChangeFacilityType = (value) => {
    setSelectedValue(value);
  };

  console.log(selectedValue);

  const addNewHotelFacility = async () => {
    // try {
    //   const response = await axios.post<DataFacilities>(`${api}/facility/add`, {
    //     facility_name: hotelFacilityInput,
    //     facility_type: selectedValue,
    //     facility_image:
    //       "https://theme.hstatic.net/1000340570/1000964732/14/icon-favorite.svg?v=3992",
    //   });
    //   const newHotelFacility = response.data;
    //   console.log(newHotelFacility);
    //   setFacilities((prevData) => [...prevData, newHotelFacility]);
    //   setHotelFacilityInput("");
    //   setFileList([]);
    // } catch (error) {
    //   console.error("Error:", error);
    // }
  };

  const deleteFacility = async (id) => {
    try {
      await axios.post(`${api}/facility/delete/${id}`);
      setFacilities(facilities.filter((type) => type.facility_id !== id));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchFacilities();
    fetchFacilityType();
  }, []);

  const filterOption = facilityType.map((type) => {
    return { value: type.facility_type_name, label: type.facility_type_name };
  });

  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const paginatedData = facilities
    .filter((item) => item.facility_name.includes(searchValue))
    .slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <Header pageTitle="Hotel Facility" />
      <div className="">
        <SideBar />
        <div className="bg-gray-100 h-fit p-5 w-full pl-[240px] pt-[90px] flex flex-col gap-4">
          <div className=" bg-white flex p-6 h-fit">
            <div className=" w-1/2 px-8">
              <p className="items-center justify-center flex font-normal text-2xl w-full  p-2">
                Add Facility
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
                      fileList={facilityImage}
                      onPreview={handlePreview}
                      onChange={handleChange}
                      accept=".png"
                    >
                      {facilityImage.length == 1 ? null : uploadButton}
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
                    placeholder="Type Facility Name"
                    value={hotelFacilityInput}
                    onChange={(e) => setHotelFacilityInput(e.target.value)}
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
                onClick={addNewHotelFacility}
              >
                <p>ADD</p>
              </button>
            </div>
            <div className="w-1/2 px-8 border-l-[1px] border-stroke h-full">
              <div className="w-full">
                <p className="font-normal text-2xl w-full px-2 pb-2">
                  List Hotel Facility
                </p>
                <div className=" w-full flex border-b-[1px] border-black p-3 items-center">
                  <input
                    type="text"
                    placeholder="Search Name Hotel Facility"
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
                      dataSource={paginatedData}
                      renderItem={(item) => (
                        <List.Item key={item.facility_id}>
                          <List.Item.Meta
                            title={
                              <div className="flex gap-2">
                                <div>{item.facility_name}</div>
                                <span>-</span>
                                <div>{item.facility_type}</div>
                              </div>
                            }
                            avatar={
                              <img
                                src={admin_api_image + item.facility_image}
                                alt={item.facility_name}
                                className="w-[20px]"
                              />
                            }
                          />
                          <HiOutlineTrash
                            className="cursor-pointer"
                            onClick={() => deleteFacility(item.facility_id)}
                          />
                        </List.Item>
                      )}
                    />
                  </ConfigProvider>

                  <div className=" flex justify-center ">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 0}
                      className=" text-xs border-[1px] border-stroke text-black py-2 px-4 rounded-md mx-1 hover:bg-gray_bg"
                    >
                      Back
                    </button>

                    {Array(Math.ceil(facilities.length / ITEMS_PER_PAGE))
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
                        Math.ceil(facilities.length / ITEMS_PER_PAGE) - 1
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
        </div>
      </div>
    </>
  );
}
