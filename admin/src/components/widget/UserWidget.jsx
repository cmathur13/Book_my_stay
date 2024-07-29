import "./widget.scss";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import useFetch from "../../hooks/useFetch";
import { useLocation } from "react-router";
import Widget from "./Widget";

const UserWidget = () => {
  const { data, loading, error } = useFetch("/users/countAll");

  //temporary
  const amount = 100;
  const diff = 20;

  const tempData = {
    title: "USERS",
    count: data,
    isMoney: false,
    link: "/users",
    linkText: "See all users",
    icon: (
      <PersonOutlinedIcon
        className="icon"
        style={{
          color: "crimson",
          backgroundColor: "rgba(255, 0, 0, 0.2)",
        }}
      />
    ),
  };

  return <Widget tempData={tempData} />;
};

export default UserWidget;
