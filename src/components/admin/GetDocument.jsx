import React, { useEffect, useState } from "react";
import DataTableList from "../DataTable";
import api from "../../service/verifyAdmin";
import Message from "../Message";

const GetDocument = () => {
  const [data, setData] = useState([]);
  const [adminData, setAdminData] = useState();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    const storeData = JSON.parse(sessionStorage.getItem("admin"));
    if (storeData) {
      setAdminData(storeData);
    }
  }, []);

  useEffect(() => {
    const getData = async () => {
      if (!adminData) return;
      try {
        const response = await api.get("/texts", {
          headers: { Authorization: `Bearer ${adminData.token}` },
        });
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, [adminData]);

  const handleNext = () => {
    if (currentIndex < data.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const deleteData = async (id) => {
    try {
      setIsLoad(true);
      const res = await api.delete(`/texts/delete/${id}`, {
        headers: { Authorization: `Bearer ${adminData.token}` },
      });

      setSuccessMessage("Muvaffaqiyatli o'chirildi");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      setErrorMessage("Xatolik: ", error.message);
      setTimeout(() => setErrorMessage(null), 3000);
      console.error(error.message);
    } finally {
      setIsLoad(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Message successMessage={successMessage} errorMessage={errorMessage} />
      <div className="flex justify-center text-white items-center gap-4 mb-4">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="cursor-pointer bg-slate-500 p-2 rounded disabled:opacity-50"
        >
          Chapga
        </button>
        <span>
          {data.length > 0 ? currentIndex + 1 : 0} / {data.length}
        </span>
        <button
          onClick={handleNext}
          disabled={currentIndex === data.length - 1}
          className="cursor-pointer bg-slate-500 p-2 rounded disabled:opacity-50"
        >
          O'nga
        </button>
      </div>
      {data.length > 0 && (
        <button
          onClick={() => deleteData(data[currentIndex]._id)}
          className="bg-red-600 active:bg-red-600 hover:bg-red-400 p-3 text-white font-semibold text-lg rounded cursor-pointer"
        >
          <i className="uppercase">{data[currentIndex].title}</i> - nomli hujjat
          bazasini o'chirish
        </button>
      )}

      {data.length > 0 && (
        <DataTableList data={[data[currentIndex]]} newClass={true} />
      )}
    </div>
  );
};

export default GetDocument;
