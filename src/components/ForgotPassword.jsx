import React, { useState } from "react";
import { changePasswordAPI, forgetPassword } from "../utils/fetchFromAPI";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const navigation = useNavigate();

  return (
    <div>
      <div className="p-5 " style={{ minHeight: "100vh" }}>
        <div className=" d-flex justify-content-center">
          {step == 0 && (
            <form className="row g-3 text-white">
              <div className="col-md-12">
                <label htmlFor="inputEmail4" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)} // Cập nhật giá trị state khi người dùng nhập email
                />
              </div>

              <div className="col-12">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    forgetPassword(email)
                      .then((res) => {
                        console.log(res)
                        toast.success(res.data.message)
                      })
                      .catch((err) => {
                        console.log(err)
                        toast.error(err.response.data.message)
                      });
                    setStep(1);
                  }}
                >
                  Next
                </button>
              </div>
            </form>
          )}

          {step == 1 && (
            <form className="row g-3 text-white">
              <div className="col-md-12">
                <label htmlFor="inputEmail4" className="form-label">
                  Nhập CODE
                </label>
                <input className="form-control" id="code" />
                <label htmlFor="inputEmail4" className="form-label">
                  Đổi mật khẩu
                </label>
                <input className="form-control" id="pass" />
              </div>

              <div className="col-12">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    let code = document.querySelector("#code").value;
                    let newPass = document.querySelector("#pass").value
                    changePasswordAPI({code,newPassword: newPass, email }).then((res) => {
                      toast.success(`${res.message}`)
                      navigation("/login");
                    }).catch((err) => {
                      toast.error(err.message)
                      
                    })
                    
                  }}
                >
                  Next
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
