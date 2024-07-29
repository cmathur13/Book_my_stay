import "./widget.scss";
import Widget from "./Widget";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import useFetch from "../../hooks/useFetch";
import { formatAmount } from "../../utils/utils";

const EarningWidget = () => {
  const { data, loading, error } = useFetch("/hotels/revenue");

  //temporary
  const amount = 100;
  const diff = 20;

  const tempData = {
    title: "EARNINGS",
    count: formatAmount(data),
    isMoney: true,
    link: "#",
    linkText: "View net earnings",
    icon: (
      <MonetizationOnOutlinedIcon
        className="icon"
        style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
      />
    ),
  };

  return <Widget tempData={tempData} />;
};

export default EarningWidget;
