import React, { useState } from "react";
import Message from "../Message";
import axios from "axios";
import { useNavigate } from "react-router";

const AdminAuth = () => {
  const [errorMessage, setErrorMessage] = useState();
  const [isLoad, setIsLoad] = useState(false);
  const [inputsValue, setInputsValue] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setIsLoad(true);
      const response = await axios.post(
        "https://uzcorpus-back.onrender.com/api/admin/login",
        inputsValue
      );
      setInputsValue({ email: "", password: "" });
      sessionStorage.setItem("admin", JSON.stringify(response.data));
      navigate("/admin/home");
    } catch (error) {
      setErrorMessage("Email yoki parol xato");
      setTimeout(() => setErrorMessage(null), 2000);
      constole.error(error);
    } finally {
      setInputsValue({ email: "", password: "" });
      setIsLoad(false);
    }
  };

  return (
    <div className="bg-black w-screen h-screen">
      <div className="max-w-[350px] absolute top-1/2 left-1/2 -translate-1/2 w-full">
        <h2 className="text-center w-full bg-blue-700 p-3 font-semibold text-white text-xl">
          Admin
        </h2>
        <form onSubmit={handleLogin} className="bg-slate-800 p-5">
          <input
            placeholder="Email"
            type="email"
            required
            onChange={(e) =>
              setInputsValue({ ...inputsValue, email: e.target.value })
            }
            className="w-full outline-none text-lg p-2 bg-slate-600 text-white mb-3"
          />
          <input
            placeholder="Password"
            type="password"
            required
            onChange={(e) =>
              setInputsValue({ ...inputsValue, password: e.target.value })
            }
            className="w-full outline-none text-lg p-2 bg-slate-600 text-white mb-3"
          />
          <button
            disabled={isLoad}
            className={`w-full ${
              isLoad ? "cursor-no-drop" : "active:bg-blue-400 cursor-pointer"
            } bg-blue-500 font-semibold text-white text-lg p-1 mb-3`}
          >
            Kirish
          </button>
          <div className="text-center text-red-600 text-md">{errorMessage}</div>
        </form>
      </div>
    </div>
  );
};

export default AdminAuth;
