import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, CardMedia } from "@mui/material";
import QrCode from "qrcode";
import { Videos, ChannelCard } from ".";
import { registerAPI } from "../utils/fetchFromAPI";
import { toast } from "react-toastify";

const SignUp = () => {
  const [channelDetail, setChannelDetail] = useState();
  const [videos, setVideos] = useState(null);
  const [qrCode, setQRCode] = useState(null);
  const [isQrScan, setIsQRScan] = useState(false);
  const { id } = useParams();
  const navigation = useNavigate();

  useEffect(() => {}, []);

  const handleQrScanConfirmation = () => {
    setIsQRScan(true)
    setTimeout(() => {
      navigation("/");
    }, 3000);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullname = e.target[0].value;
    const email = e.target[1].value;
    const pass = e.target[2].value;

    registerAPI({ fullname, email, pass })
      .then((res) => {
        const secret = res.data.secret;
        console.log(secret);
        const otpAuth = `otpauth://totp/${email}?secret=${secret}&&issuer=node44`;
        QrCode.toDataURL(otpAuth)
          .then((res_qr) => {
            setQRCode(res_qr);
            toast.success(`${res.message}`);
          })
          .catch(() => {
           
          });

       
      })
      .then((err) => {
        console.log(err)
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
      {qrCode && (
        <div className="text-center mt-4">
          <h4>Scan the QR Code with Google Authenticator</h4>
          <img src={qrCode} alt="QR Code" />
          <button
            onClick={handleQrScanConfirmation}
            type="button"
            className="btn btn-success mt-3"
          >
            I've Scanned the QR Code
          </button>
        </div>
      )}
    </div>
  );
};

export default SignUp;
