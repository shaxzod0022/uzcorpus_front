import React, { useEffect, useState } from "react";
import api from "../../service/verifyAdmin";
import Message from "../Message";
import DataTableList from "../DataTable";

const GetDocument = () => {
  const [data, setData] = useState([]);
  const [adminData, setAdminData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Sessiondan adminni olish
  useEffect(() => {
    const stored = JSON.parse(sessionStorage.getItem("admin"));
    if (stored) setAdminData(stored);
  }, []);

  // Hujjatlarni olish
  useEffect(() => {
    const fetchData = async () => {
      if (!adminData) return;
      try {
        const res = await api.get("/texts", {
          headers: { Authorization: `Bearer ${adminData.token}` },
        });
        setData(res.data);
      } catch (err) {
        console.error("Xatolik:", err);
      }
    };

    fetchData();
  }, [adminData]);

  const handleNext = () => {
    if (currentIndex < data.length - 1) setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  const handleDelete = async (id) => {
    setIsLoading(true);
    try {
      await api.delete(`/texts/delete/${id}`, {
        headers: { Authorization: `Bearer ${adminData.token}` },
      });
      setSuccessMessage("Muvaffaqiyatli o'chirildi");
      setData(data.filter((item) => item._id !== id));
      setCurrentIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } catch (error) {
      setErrorMessage("Xatolik yuz berdi");
      console.error(error);
    } finally {
      setTimeout(() => {
        setSuccessMessage(null);
        setErrorMessage(null);
      }, 3000);
      setIsLoading(false);
    }
  };

  const current = data[currentIndex];
  // console.log(current);

  return (
    <div className="flex flex-col items-center p-4">
      <Message successMessage={successMessage} errorMessage={errorMessage} />

      {data.length > 0 && (
        <>
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="bg-blue-600 cursor-pointer hover:bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              ← Oldingi
            </button>
            <span className="text-white font-semibold">
              {currentIndex + 1} / {data.length}
            </span>
            <button
              onClick={handleNext}
              disabled={currentIndex === data.length - 1}
              className="bg-blue-600 cursor-pointer hover:bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              Keyingi →
            </button>
          </div>

          <button
            onClick={() => handleDelete(current._id)}
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-500 cursor-pointer text-white px-6 py-2 rounded font-medium mb-4"
          >
            🗑 {current.title} hujjatini o‘chirish
          </button>

          <DataTableList data={[current]} newClass={true} />
        </>
      )}

      {data.length === 0 && (
        <p className="text-white text-lg font-medium">Hujjatlar mavjud emas.</p>
      )}
    </div>
  );
};

export default GetDocument;
