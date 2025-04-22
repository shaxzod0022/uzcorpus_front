import React from "react";
import { useNavigate } from "react-router";
const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="flex bg-blue-600 items-center sm:justify-between justify-center gap-5 flex-wrap p-4 md:px-16 lg:px-40">
      <div
        onClick={() => navigate("/")}
        className="flex cursor-pointer items-center gap-5"
      >
        <img
          className="sm:w-20 w-12 rounded-full"
          src="https://img.freepik.com/premium-vector/persian-green-golden-glossy-italic-arrow-shaped-letter-k-icon-white-background_95164-13151.jpg?semt=ais_hybrid&w=740"
          alt="logo"
        />
        <span className="sm:text-2xl text-lg font-bold text-white">
          KONKORDANSER
        </span>
      </div>
      <ul>
        <li>
          <a
            className="text-white sm:text-lg text-md font-semibold transition-all duration-200 hover:text-blue-300"
            href="https://uz.wikipedia.org/wiki/Konkordanser"
            target="_blank"
          >
            Konkordanser nima?
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Header;
