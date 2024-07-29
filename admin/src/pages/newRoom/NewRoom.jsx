import "./newRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { roomInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import CustomModal from "../../components/customModal/CustomModal";

const INITIAL_STATE = {
  title: "",
  price: 0,
  maxPeople: 0,
  desc: "",
};

const NewRoom = () => {
  const [info, setInfo] = useState({ ...INITIAL_STATE });
  const [hotelId, setHotelId] = useState(undefined);
  const [rooms, setRooms] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const { data, loading, error } = useFetch("/hotels");

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const roomNumbers = rooms.split(",").map((room) => ({
      number: room,
      unavailableDates: [],
    }));

    const newRoom = {
      ...info,
      roomNumbers,
    };
    await axios.post(`/rooms/${hotelId}`, newRoom);
    setShowModal(true);
    setInfo({ ...INITIAL_STATE });
    setRooms([]);
    setHotelId(undefined);
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add new Room</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {roomInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                    value={info[input.id]}
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Mention Room Numbers</label>
                <textarea
                  onChange={(e) => setRooms(e.target.value)}
                  placeholder="give comma between rooms"
                  value={rooms}
                />
              </div>
              <div className="formInput">
                <label>Choose a Hotel</label>
                <select
                  id="hotelId"
                  onChange={(e) => setHotelId(e.target.value)}
                  value={hotelId}
                >
                  {loading
                    ? "Loading...."
                    : data &&
                      data.map((hotel) => (
                        <option key={hotel._id} value={hotel._id}>
                          {hotel.name}
                        </option>
                      ))}
                </select>
              </div>
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
      <CustomModal
        showModal={showModal}
        setShowModal={setShowModal}
        text={"Room has been created !"}
      />
    </div>
  );
};

export default NewRoom;
