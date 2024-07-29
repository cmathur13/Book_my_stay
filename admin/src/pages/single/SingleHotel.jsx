import "./singleHotel.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import useFetch from "../../hooks/useFetch";
import { useLocation } from "react-router-dom";
import { getMonthName } from "../../utils/utils";

const SingleHotel = () => {
  const location = useLocation();
  const hotelID = location.pathname.split("/")[2];
  const { data, loading, error } = useFetch(`/hotels/find/${hotelID}`);
  const { data: chartData } = useFetch(
    `/reservations/hotels/revenue/${hotelID}`
  );

  const processedChartData = chartData.map((data) => {
    return {
      Total: data.amount,
      name: getMonthName(data.month),
    };
  });

  console.log("Hello    SingleHotel   chartData", chartData);

  console.log("Hello    SingleHotel   data", data);
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainerHotel">
        <Navbar />
        <div className="top">
          <div className="editButton">Edit</div>
          <h1 className="title">Hotel Information</h1>
          <div className="item">
            <div className="itemContainer">
              <img
                src={
                  data && data.photos && data.photos.length > 0
                    ? data.photos[0]
                    : "https://images.pexels.com/photos/7078692/pexels-photo-7078692.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                }
                alt=""
                className="itemImg"
              />
            </div>
            <div className="details">
              <h1 className="itemTitle">{data.name}</h1>
              <div className="detailItem">
                <span className="itemKey">Title:</span>
                <span className="itemValue">{data.title}</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Address:</span>
                <span className="itemValue">{data.address}</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">City:</span>
                <span className="itemValue">{data.city}</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Description:</span>
                <span className="itemValue">{data.desc}</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Featured:</span>
                <span className="itemValue">{data.featured + ""}</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Starting Price:</span>
                <span className="itemValue">{data.cheapestPrice}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom">
          <Chart
            aspect={3 / 1}
            title="Hotel Earnings ( Last 6 Months)"
            additionalClass={"hotel"}
            chartData={processedChartData}
          />
        </div>
      </div>
    </div>
  );
};

export default SingleHotel;
