// pages/SearchPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchType from "./SearchType";

const SearchPage = () => {
  const [documents, setDocuments] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [types, setTypes] = useState([]);
  const [subcorpuses, setSubcorpuses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://uzcorpus-back.onrender.com/api/texts");
        const data = res.data;
        setDocuments(data);

        setAuthors([...new Set(data.map((doc) => doc.author))]);
        setTypes([...new Set(data.map((doc) => doc.type?.name || ""))]);
        setSubcorpuses([
          ...new Set(data.map((doc) => doc.subcorpus?.name || "")),
        ]);
      } catch (err) {
        console.error("Ma’lumotlarni olishda xatolik:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Qidiruv sahifasi</h1>
      <SearchType
        documents={documents}
        authors={authors}
        types={types}
        subcorpuses={subcorpuses}
      />
    </div>
  );
};

export default SearchPage;
