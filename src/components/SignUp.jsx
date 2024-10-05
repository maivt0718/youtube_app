import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, CardMedia } from "@mui/material";

import { Videos, ChannelCard } from ".";
import { registerAPI } from "../utils/fetchFromAPI";
import { toast } from "react-toastify";

const SignUp = () => {
  const [channelDetail, setChannelDetail] = useState();
  const [videos, setVideos] = useState(null);

  const { id } = useParams();
  const navigation = useNavigate();

  useEffect(() => {}, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullname = e.target[0].value;
    const email = e.target[1].value;
    const pass = e.target[2].value

    registerAPI({ fullname, email, pass })
      .then((res) => {
        toast.success(`${res.message}`);
        setTimeout(() => {
          navigation("/");
        }, 3000);
      })
      .then((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <div className="p-5 " style={{ minHeight: "100vh" }}>
      <div className=" d-flex justify-content-center">
        <form className="row g-3 text-white" onSubmit={handleSubmit}>
          <div className="col-md-12">
            <label htmlFor="inputEmail4" className="form-label">
              Full name
            </label>
            <input className="form-control" id="fullName" />
          </div>
          <div className="col-md-12">
            <label htmlFor="inputEmail4" className="form-label">
              Email
            </label>
            <input type="email" className="form-control" id="email" />
          </div>

          <div className="col-md-12">
            <label htmlFor="inputEmail4" className="form-label">
              Password
            </label>
            <input className="form-control" id="pass" />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
