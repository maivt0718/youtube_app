import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { loginAPI, loginFBAPI } from "../utils/fetchFromAPI";
import { toast } from "react-toastify";
import FacebookLoginWithButton, { FacebookLogin } from "react-facebook-login";

const Login = () => {
  const [channelDetail, setChannelDetail] = useState();
  const [videos, setVideos] = useState(null);

  const { id } = useParams();
  const navigation = useNavigate();

  useEffect(() => {}, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
  };
  const handleSuccess = (response) => {
    let {id, email, name} = response
    loginFBAPI.then((res) => {
      toast.success(res.message)
      localStorage.setItem("LOGIN_USER", res.data)
    }).catch((err) => {
      toast.error(err.message)
    })
  };

  const handleFailure = (error) => {
    toast.error(error.message)
    // Handle login failure here
  };

  return (
    <div className="p-5 " style={{ minHeight: "100vh" }}>
      <div className=" d-flex justify-content-center">
        <form className="row g-3 text-white">
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
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                let email = document.getElementById("email").value;
                let pass_word = document.getElementById("pass").value;
                loginAPI({ email, pass_word })
                  .then((res) => {
                    toast.success(res.message);
                    localStorage.setItem("LOGIN_USER", res.data);
                    setTimeout(() => {
                      navigation("/");
                    }, 3000);
                  })
                  .catch((err) => {
                    console.log(err);
                    toast.error(`${err.response.data.message}`);
                    setTimeout(() => {
                      navigation("/");
                    }, 3000);
                  });
              }}
            >
              Login
            </button>
            <FacebookLoginWithButton
              appId="YOUR_FACEBOOK_APP_ID"
              onSuccess={handleSuccess}
              onFail={handleFailure}
            ></FacebookLoginWithButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
