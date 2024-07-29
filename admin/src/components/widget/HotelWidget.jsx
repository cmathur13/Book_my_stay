import "./widget.scss";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import useFetch from "../../hooks/useFetch";
import { useLocation } from "react-router";
import Widget from "./Widget";

const HotelWidget = () => {
  const { data, loading, error } = useFetch("/hotels/countAll");

  //temporary
  const amount = 100;
  const diff = 20;

  const tempData = {
    title: "HOTELS",
    count: data,
    isMoney: false,
    link: "/hotels",
    linkText: "See All Hotels",
    icon: (
      <ApartmentOutlinedIcon
        className="icon"
        style={{
          backgroundColor: "rgba(128, 0, 128, 0.2)",
          color: "purple",
        }}
      />
    ),
  };

  return <Widget tempData={tempData} />;
};

export default HotelWidget;
