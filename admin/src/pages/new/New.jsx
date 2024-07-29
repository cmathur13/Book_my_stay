import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router";
import CustomModal from "../../components/customModal/CustomModal";
import CustomCircularLoading from "../../components/CustomCircularLoading/CustomCircularLoading";

const INITIAL_STATE = {
  username: "",
  email: "",
  country: "",
  city: "",
  phone: "",
  password: "",
};

const New = ({ inputs, title }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [file, setFile] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [info, setInfo] = useState({ ...INITIAL_STATE });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");
    try {
      setIsLoading(true);
      const uploadResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/dnswci82h/image/upload",
        data
      );

      const { url } = uploadResponse.data;
      const newUser = {
        ...info,
        img: url,
      };
      const res = await axios.post(`/auth/register`, newUser);
      setIsLoading(false);
      setShowModal(true);
      setInfo({ ...INITIAL_STATE });
      setFile("");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        {isLoading ? (
          <CustomCircularLoading />
        ) : (
          <div className="bottom">
            <div className="left">
              <img
                src={
                  file
                    ? URL.createObjectURL(file)
                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                }
                alt=""
              />
            </div>
            <div className="right">
              <form>
                <div className="formInput">
                  <label htmlFor="file">
                    Image: <DriveFolderUploadOutlinedIcon className="icon" />
                  </label>
                  <input
                    type="file"
                    id="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    style={{ display: "none" }}
                  />
                </div>

                {inputs.map((input) => (
                  <div className="formInput" key={input.id}>
                    <label>{input.label}</label>
                    <input
                      onChange={handleChange}
                      type={input.type}
                      placeholder={input.placeholder}
                      id={input.id}
                      value={info[input.id]}
                    />
                  </div>
                ))}
                <div className="formButton">
                  <button onClick={handleClick} disabled={isLoading}>
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      <CustomModal
        showModal={showModal}
        setShowModal={setShowModal}
        text={"User has been created !"}
      />
    </div>
  );
};

export default New;
