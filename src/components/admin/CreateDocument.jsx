import React, { useEffect, useState } from "react";
import Message from "../Message";
import api from "../../service/verifyAdmin";

const fieldLabels = {
  title: "Hujjat nomi",
  author: "Muallif nomi",
  yearCreated: "Yaratilgan yil",
  domain: "Faoliyat sohasi",
  topic: "Matn mavzusi",
  eventLocationTime: "Zamon va joy",
  genre: "Janr",
  type: "Matn turi",
  style: "Matn stili",
  audienceAge: "Auditoriya yoshi",
  audienceLevel: "Auditoriya bilim darajasi",
  audienceSize: "Auditoriya hajmi",
  sentenceCount: "Gaplar soni",
  wordFormCount: "So‘z shakllari soni",
  sourceType: "Manba turi",
  source: "Manba",
  publicationDate: "Nashr sanasi",
  publicationType: "Nashr turi",
  publisher: "Nashriyot",
  subcorpus: "Korpus bo‘limi",
  text: "Matn",
};

const CreateDocument = () => {
  const [document, setDocument] = useState({
    title: "",
    author: "",
    yearCreated: "",
    domain: "",
    topic: "",
    eventLocationTime: "",
    genre: "",
    type: "",
    style: "",
    audienceAge: "",
    audienceLevel: "",
    audienceSize: "",
    sentenceCount: "",
    wordFormCount: "",
    sourceType: "",
    source: "",
    publicationDate: "",
    publicationType: "",
    publisher: "",
    subcorpus: "",
    text: "",
  });

  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoad, setIsLoad] = useState(false);
  const [adminData, setAdminData] = useState();

  const handleChange = (e) => {
    setDocument({
      ...document,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem("admin"));
    if (data) {
      setAdminData(data);
    }
  }, []);

  const handleSubmit = async () => {
    try {
      setIsLoad(true);
      const res = await api.post("/texts/add", document, {
        headers: { Authorization: `Bearer ${adminData.token}` },
      });
      setSuccessMessage("Hujjat muvaffaqiyatli yaratildi!");
      setTimeout(() => setSuccessMessage(null), 3000);
      setDocument({ ...document, text: "" });
    } catch (error) {
      console.error(error);
      setErrorMessage("Xatolik yuz berdi: " + error.message);
      setTimeout(() => setErrorMessage(null), 3000);
    } finally {
      setIsLoad(false);
    }
  };

  return (
    <div className="p-4 max-w-xl w-full mx-auto border-2 border-white rounded-xl text-white">
      <Message successMessage={successMessage} errorMessage={errorMessage} />
      <h2 className="text-xl font-bold mb-4 text-center">
        Yangi Hujjat Qo‘shish
      </h2>
      {Object.entries(document).map(([key, value]) => (
        <div key={key} className="mb-3">
          <label className="block mb-1">{fieldLabels[key] || key}</label>
          {key === "text" ? (
            <textarea
              name={key}
              value={value}
              onChange={handleChange}
              placeholder={fieldLabels[key]}
              className="w-full border p-2 border-white/50 rounded outline-none"
              rows={4}
            />
          ) : (
            <input
              type="text"
              name={key}
              value={value}
              onChange={handleChange}
              placeholder={fieldLabels[key]}
              className="w-full border p-2 border-white/50 rounded outline-none"
            />
          )}
        </div>
      ))}

      <button
        onClick={handleSubmit}
        disabled={isLoad}
        className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ${
          isLoad ? "opacity-50 cursor-no-drop" : "cursor-pointer"
        }`}
      >
        {isLoad ? "Yuborilmoqda..." : "Yaratish"}
      </button>
    </div>
  );
};

export default CreateDocument;
