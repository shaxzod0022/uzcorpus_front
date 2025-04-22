import React, { useEffect, useState } from "react";
import Message from "../Message";
import api from "../../service/verifyAdmin";

const fieldLabels = {
  title: "Hujjat nomi",
  author: "Muallif nomi",
  yearCreated: "Yaratilgan yil",
  domain: "Faoliyat sohasi (ixtiyoriy)",
  topic: "Hujjat mavzusi (ixtiyoriy)",
  eventLocationTime: "Zamon va joy (ixtiyoriy)",
  genre: "Hujjat turi",
  type: "Janrini tanlang",
  style: "Hujjat stili (ixtiyoriy)",
  audienceAge: "Auditoriya yoshi (ixtiyoriy)",
  audienceLevel: "Auditoriya bilim darajasi (ixtiyoriy)",
  audienceSize: "Auditoriya hajmi (ixtiyoriy)",
  sourceType: "Manba turi (ixtiyoriy)",
  source: "Manba nomi (ixtiyoriy)",
  publicationDate: "Nashr sanasi  (ixtiyoriy)",
  publicationType: "Nashr turi  (ixtiyoriy)",
  publisher: "Nashriyot nomi  (ixtiyoriy)",
  subcorpus: "Korpus bo‘limini tanlang",
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
    sourceType: "",
    source: "",
    publicationDate: "",
    publicationType: "",
    publisher: "",
    subcorpus: "",
    text: "",
  });

  const [subcorpusList, setSubcorpusList] = useState([]);
  const [typeList, setTypeList] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoad, setIsLoad] = useState(false);
  const [adminData, setAdminData] = useState();

  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem("admin"));
    if (data) setAdminData(data);

    // Subcorpus va Type ro'yxatini olib kelish
    const fetchOptions = async () => {
      try {
        const [subcorpusRes, typeRes] = await Promise.all([
          api.get("/subcorpus"),
          api.get("/types"),
        ]);
        setSubcorpusList(subcorpusRes.data);
        setTypeList(typeRes.data);
      } catch (err) {
        console.error("Select ro'yxatlarini olishda xatolik:", err);
      }
    };

    fetchOptions();
  }, []);

  const handleChange = (e) => {
    setDocument({
      ...document,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      setIsLoad(true);
      const res = await api.post("/texts/add", document, {
        headers: { Authorization: `Bearer ${adminData?.token}` },
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
          ) : key === "subcorpus" ? (
            <select
              name="subcorpus"
              value={value}
              onChange={handleChange}
              className="w-full border p-2 border-white/50 rounded outline-none"
            >
              <option value="">Tanlang</option>
              {subcorpusList.map((item) => (
                <option className="bg-black" key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          ) : key === "type" ? (
            <select
              name="type"
              value={value}
              onChange={handleChange}
              className="w-full border p-2 border-white/50 rounded outline-none"
            >
              <option value="">Tanlang</option>
              {typeList.map((item) => (
                <option className="bg-black" key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
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
          isLoad ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        {isLoad ? "Yuborilmoqda..." : "Yaratish"}
      </button>
    </div>
  );
};

export default CreateDocument;
