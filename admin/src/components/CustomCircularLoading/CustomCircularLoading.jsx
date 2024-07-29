import React from "react";
import { CircularProgress } from "@mui/material";

const CustomCircularLoading = () => {
  return (
    <div
      className="loading"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <CircularProgress />
    </div>
  );
};

export default CustomCircularLoading;
