import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import "./reserve.css";
import useFetch from "../../hooks/useFetch";
import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const Reserve = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [total, setTotal] = useState(0);
  const { data, loading, error } = useFetch(`/hotels/rooms/${hotelId}`);

  let roomPriceMap = new Map();

  data.forEach((roomData) => {
    roomData.roomNumbers.forEach((room) => {
      roomPriceMap.set(room._id, roomData.price);
    });
  });

  const { dates } = useContext(SearchContext);
  const { user } = useContext(AuthContext);
  const { _id: userId } = user;

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  useEffect(() => {
    let calculatedValue = 0;
    selectedRooms.forEach((room) => {
      calculatedValue += roomPriceMap.get(room) * (alldates.length - 1);
    });

    setTotal(calculatedValue);
  }, [selectedRooms]);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );

    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      if (selectedRooms.length === 0) return;

      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(`/rooms/availability/${roomId}`, {
            dates: alldates,
          });
          return res.data;
        })
      );

      const reservationResponse = await axios.post("/reservations", {
        userId: userId,
        startDate: dates[0].startDate,
        endDate: dates[0].endDate,
        hotelId: hotelId,
        roomsId: selectedRooms,
        total: total,
      });
      setOpen(false);
      navigate("/");
    } catch (err) {}
  };
  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>
        {data.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Max people: <b>{item.maxPeople}</b>
              </div>
              <div className="rPrice">{item.price}</div>
            </div>
            <div className="rSelectRooms">
              {item.roomNumbers.map((roomNumber) => (
                <div className="room">
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        {data.length === 0 && (
          <>
            <p className="no-available">
              Sorry, currently no rooms are available
            </p>
          </>
        )}

        <div>
          <h3>
            Total : <span>₹{total}</span>
          </h3>

          <button onClick={handleClick} className="rButton">
            Reserve Now!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reserve;
