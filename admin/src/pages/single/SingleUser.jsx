import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import { useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { getMonthName } from "../../utils/utils";

const Single = () => {
  const location = useLocation();
  const userID = location.pathname.split("/")[2];
  const { data, loading, error } = useFetch(`/users/${userID}`);
  const { data: reservationData } = useFetch(`/reservations/users/${userID}`);
  const { data: chartData } = useFetch(`/reservations/users/revenue/${userID}`);

  const processedChartData = chartData.map((data) => {
    return {
      Total: data.amount,
      name: getMonthName(data.month),
    };
  });

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src={data.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{data?.username}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{data?.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">{data?.phone}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">
                    {`${data.city}, ${data.country}`}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Country:</span>
                  <span className="itemValue">{data?.country}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart
              aspect={3 / 1}
              title="User Spending ( Last 6 Months)"
              chartData={processedChartData}
            />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Latest Bookings</h1>
          <Table reservationData={reservationData || {}} />
        </div>
      </div>
    </div>
  );
};

export default Single;
