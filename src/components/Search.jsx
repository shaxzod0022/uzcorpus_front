import React, { useState } from "react";
import DataTableList from "./DataTable";
import axios from "axios";
import Message from "./Message";
const Search = () => {
  const [data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState();
  const [successMessage, setSuccesMessage] = useState();
  const [isLoad, setIsLoad] = useState(false);
  const [value, setValue] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!value || value.trim().length === 0) {
      setErrorMessage("So'z kiritilmadi");
      setTimeout(() => setErrorMessage(null), 4000);
      return;
    }

    try {
      setIsLoad(true);
      const response = await axios.get(
        `https://uzcorpus-back.onrender.com/api/texts/search?q=${encodeURIComponent(value)}`
      );

      setSuccesMessage("Ma'lumot topildi");
      setTimeout(() => setSuccesMessage(null), 4000);
      setData(response.data); // nota: respons -> response
    } catch (error) {
      console.error(error);
      setErrorMessage(
        error.response?.data?.message || "Qidiruvda xatolik yuz berdi"
      );
      setTimeout(() => setErrorMessage(null), 4000);
    } finally {
      setIsLoad(false);
    }
  };

  return (
    <div className="bg-white/50 md:w-[80%] w-full mx-auto sm:p-12 p-5 rounded-lg">
      <Message successMessage={successMessage} errorMessage={errorMessage} />
      <form
        onSubmit={handleSubmit}
        className="flex items-center sm:justify-between justify-center gap-3 w-full flex-wrap mx-auto rounded-lg"
      >
        <input
          type="text"
          className="outline-none md:text-lg text-md bg-white md:p-3 p-2 rounded-lg sm:w-[75%] w-full"
          placeholder="So'zni kiriting"
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <button
          disabled={isLoad}
          className={`${
            isLoad
              ? "bg-blue-400 cursor-no-drop"
              : "bg-blue-600 cursor-pointer hover:bg-blue-400 active:scale-90"
          }  transition-all duration-200 rounded-lg text-white sm:text-lg text-md font-semibold py-2 sm:px-5 px-3`}
        >
          Qidirish
        </button>
      </form>
      {isLoad && (
        <div className="flex items-center justify-center p-32">
          <span className="search__loader"></span>
        </div>
      )}
      {data.length !== 0 && (
        <>
          <h2 className="text-center font-semibold text-xl my-4">
            Natijalar {data.length} ta
          </h2>
          <div className="flex justify-center">
            <button
              onClick={() => setData([])}
              className="cursor-pointer bg-red-500 active:scale-90 transition-all duration-200 hover:bg-red-400 text-white p-2 rounded-md"
            >
              Natijalarni tozalash
            </button>
          </div>
          <DataTableList data={data} />
        </>
      )}
    </div>
  );
};

export default Search;
