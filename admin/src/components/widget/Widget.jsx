import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { getCurrency } from "../../utils/utils";

const Widget = ({ tempData }) => {
  //temporary
  const amount = 100;
  const diff = 20;

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{tempData.title}</span>
        <span className="counter">
          {tempData.isMoney && getCurrency()} {tempData.count}
        </span>
        <a href={tempData.link} className="link">
          <span className="linkText">{tempData.linkText}</span>
        </a>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {tempData.icon}
      </div>
    </div>
  );
};

export default Widget;
