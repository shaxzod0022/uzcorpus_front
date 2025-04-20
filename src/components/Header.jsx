import React from "react";
import logo from "../assets/gerb_flag.png";
import { useNavigate } from "react-router";
const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center sm:justify-between justify-center gap-5 flex-wrap mb-8">
      <div
        onClick={() => navigate("/")}
        className="flex cursor-pointer items-center gap-5"
      >
        <img className="sm:w-20 w-12 rounded-full" src={logo} alt="logo" />{" "}
        <span className="sm:text-2xl text-lg font-bold text-blue-600">
          O'zbek tili milliy korpusi
        </span>
      </div>
      <ul>
        <li>
          <a
            className="text-blue-600 sm:text-lg text-md font-semibold transition-all duration-200 hover:text-white"
            href="https://uz.wikipedia.org/wiki/O%CA%BBzbekiston"
            target="_blank"
          >
            O'zbekiston haqida
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Header;
