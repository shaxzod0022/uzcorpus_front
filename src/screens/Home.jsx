import React from "react";
import Search from "../components/Search";
import Header from "../components/Header";

const Home = () => {
  return (
    <div className="max-w-[1600px] mx-auto p-4 md:px-16 lg:px-40 bg__globus">
      <Header />
      <Search />
    </div>
  );
};

export default Home;
