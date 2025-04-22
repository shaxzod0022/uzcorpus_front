import React, { useState } from "react";
import DataTableList from "./DataTable";
import axios from "axios";
import Message from "./Message";
import SearchType from "./SearchType";
import SearchPage from "./SearchPage";
const Search = () => {
  return (
    <div className="bg-white/50 md:w-[80%] w-full mx-auto sm:p-12 p-5 rounded-lg">
      {/* <Message successMessage={successMessage} errorMessage={errorMessage} /> */}
      {/* <SearchType /> */}
      <SearchPage />
    </div>
  );
};

export default Search;
