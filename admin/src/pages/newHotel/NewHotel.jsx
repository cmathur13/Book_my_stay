import "./newHotel.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { hotelInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import CustomModal from "../../components/customModal/CustomModal";
import CustomCircularLoading from "../../components/CustomCircularLoading/CustomCircularLoading";

const INITIAL_STATE = {
  name: "",
  type: "",
  city: "",
  address: "",
  distance: "",
  title: "",
  desc: "",
  cheapestPrice: 0,
  featured: false,
};

const NewHotel = () => {
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({ ...INITIAL_STATE });
  const [rooms, setRooms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { data, loading, error } = useFetch("/rooms");

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSelect = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRooms(value);
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");

          const uploadResponse = await axios.post(
            "https://api.cloudinary.com/v1_1/dnswci82h/image/upload",
            data
          );

          const { url } = uploadResponse.data;

          return url;
        })
      );

      const newHotel = {
        ...info,
        rooms,
        photos: list,
      };
      await axios.post(`/hotels`, newHotel);

      setIsLoading(false);
      setShowModal(true);
      setInfo({ ...INITIAL_STATE });
      setRooms([]);
      setFiles("");
    } catch (error) {}
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add new Hotel</h1>
        </div>
        {isLoading ? (
          <CustomCircularLoading />
        ) : (
          <div className="bottom">
            <div className="left">
              <img
                src={
                  files
                    ? URL.createObjectURL(files[0])
                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                }
                alt=""
              />
            </div>
            <div className="right">
              <form>
                <div className="formInput">
                  <label htmlFor="file">
                    Image: <DriveFolderUploadOutlinedIcon className="icon" />
                  </label>
                  <input
                    type="file"
                    id="file"
                    multiple
                    onChange={(e) => setFiles(e.target.files)}
                    style={{ display: "none" }}
                  />
                </div>

                {hotelInputs.map((input) => (
                  <div className="formInput" key={input.id}>
                    <label>{input.label}</label>
                    <input
                      id={input.id}
                      onChange={handleChange}
                      type={input.type}
                      placeholder={input.placeholder}
                      value={info[input.id]}
                    />
                  </div>
                ))}
                <div className="formInput">
                  <label>Featured </label>
                  <select
                    id="featured"
                    onChange={handleChange}
                    value={info["featured"]}
                  >
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                  </select>
                </div>
                <div className="selectRooms">
                  <label>Rooms </label>
                  <select
                    id="rooms"
                    multiple
                    onChange={handleSelect}
                    value={rooms}
                  >
                    {loading
                      ? "Loading ...."
                      : data &&
                        data.map((room) => (
                          <option key={room._id} value={room._id}>
                            {room.title}
                          </option>
                        ))}
                  </select>
                </div>
                <button onClick={handleClick} disabled={isLoading}>
                  Send
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
      <CustomModal
        showModal={showModal}
        setShowModal={setShowModal}
        text={"Hotel has been created !"}
      />
    </div>
  );
};

export default NewHotel;
