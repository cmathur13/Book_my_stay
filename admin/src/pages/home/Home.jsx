import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import UserWidget from "../../components/widget/UserWidget";
import HotelWidget from "../../components/widget/HotelWidget";
import EarningWidget from "../../components/widget/EarningWidget";
import useFetch from "../../hooks/useFetch";
import { getMonthName } from "../../utils/utils";
import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
  const date = new Date();
  const currentMonth = date.getMonth();

  // const [cData, setCData] = useState([]);

  let months = [];

  for (let i = 6; i >= 1; i--) {
    months.push(currentMonth - i);
  }

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const list = await Promise.all(
  //       months.map(async (month) => {
  //         const res = await axios.get(`/hotels/revenue/${month}`);

  //         console.log("🚀 ~ file: Home.jsx:24 ~ Home ~ res", res);
  //         return res.data;
  //       })
  //     );

  //     // setCData(list);
  //   };

  //   fetchData();
  // }, []);

  const { data: data6Month } = useFetch(`/hotels/revenue/${currentMonth - 6}`);
  const { data: data5Month } = useFetch(`/hotels/revenue/${currentMonth - 5}`);
  const { data: data4Month } = useFetch(`/hotels/revenue/${currentMonth - 4}`);
  const { data: data3Month } = useFetch(`/hotels/revenue/${currentMonth - 3}`);
  const { data: data2Month } = useFetch(`/hotels/revenue/${currentMonth - 2}`);
  const { data: data1Month } = useFetch(`/hotels/revenue/${currentMonth - 1}`);

  const chartData = [
    { name: getMonthName(currentMonth - 6), Total: data6Month },
    { name: getMonthName(currentMonth - 5), Total: data5Month },
    { name: getMonthName(currentMonth - 4), Total: data4Month },
    { name: getMonthName(currentMonth - 3), Total: data3Month },
    { name: getMonthName(currentMonth - 2), Total: data2Month },
    { name: getMonthName(currentMonth - 1), Total: data1Month },
  ];

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <UserWidget />
          <HotelWidget />
          <EarningWidget />
        </div>
        <div className="charts">
          <Featured />
          <Chart
            title="Last 6 Months (Revenue)"
            aspect={2 / 1}
            chartData={chartData}
          />
        </div>
        {/* <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div> */}
      </div>
    </div>
  );
};

export default Home;
