import axios from "axios";
import React, { useState } from "react";

const SearchType = ({ documents, authors, types, subcorpuses }) => {
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedSubcorpus, setSelectedSubcorpus] = useState("");
  const [searchText, setSearchText] = useState("");
  const [filteredDocs, setFilteredDocs] = useState([]);
  const [hasSearched, setHasSearched] = useState(false); // Yangi o‘zgaruvchi
  const [isLoad, setIsLoad] = useState(false);
  const handleSearch = async () => {
    setHasSearched(true); // Qidiruv bosilganini belgilash
    try {
      // Parametrlarni yaratish
      setIsLoad(true);
      const params = {
        q: searchText,
        ...(selectedAuthor && { author: selectedAuthor }),
        ...(selectedType && { type: selectedType }),
        ...(selectedSubcorpus && { subcorpus: selectedSubcorpus }),
      };

      const response = await axios.get(
        "https://uzcorpus-back.onrender.com/api/texts/search",
        {
          params,
        }
      );

      const result = response.data;

      if (Array.isArray(result)) {
        setFilteredDocs(result);
      } else {
        console.error("Natija kutilgan formatda emas");
        setFilteredDocs([]);
      }
    } catch (error) {
      console.error("Qidiruvda xatolik:", error);
      setFilteredDocs([]);
    } finally {
      setIsLoad(false);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <select
          value={selectedAuthor}
          onChange={(e) => setSelectedAuthor(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Barcha mualliflar</option>
          {authors?.map((author) => (
            <option key={author} value={author}>
              {author}
            </option>
          ))}
        </select>

        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Barcha janrlar</option>
          {types?.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <select
          value={selectedSubcorpus}
          onChange={(e) => setSelectedSubcorpus(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Barcha korpuslar</option>
          {subcorpuses?.map((sub) => (
            <option key={sub} value={sub}>
              {sub}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="So‘z bo‘yicha qidiruv..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="border p-2 rounded flex-1"
        />

        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white cursor-pointer active:bg-blue-300 px-4 py-2 rounded"
        >
          Qidirish
        </button>
      </div>

      <div className="mt-4">
        {/* Qidiruv amalga oshirilmagan bo‘lsa "Qidiring" ko‘rsatamiz */}
        {!hasSearched ? (
          <p>Qidiruvni amalga oshiring!</p>
        ) : isLoad ? ( // Agar loading bo‘lsa, yuklanayotganini ko‘rsatish
          <p>Yuklanmoqda...</p>
        ) : filteredDocs.length === 0 ? (
          <p>Hujjat topilmadi</p>
        ) : (
          filteredDocs.map((doc, index) => (
            <div key={index} className="border p-4 mb-4 rounded">
              <h2 className="font-bold text-lg">{doc.title}</h2>
              <p>
                <strong>Muallif:</strong> {doc.author}
              </p>

              <p>
                <strong>Janri: </strong>
                {doc.type}
              </p>
              <p>
                <strong>Korpus bo'limi: </strong>
                {doc.subcorpus}
              </p>

              <p>
                <strong>"{searchText}" aynan so‘z sifatida:</strong>{" "}
                {doc.fullMatchCount || 0} marta
              </p>
              <p>
                <strong>"{searchText}" va qo‘shimchalari bilan:</strong>{" "}
                {doc.suffixMatchCount || 0} marta
              </p>

              <details className="mt-2">
                <summary className="cursor-pointer text-blue-600">
                  🔍 Barcha so‘z ishtirok etgan gaplar
                </summary>
                <ul className="list-disc ml-5 mt-2">
                  {doc.suffixSentences.length !== 0
                    ? doc.suffixSentences.map((s, i) => {
                        // Qidirilgan so'zni topish va uning rangini o'zgartirish
                        const regex = new RegExp(`(${searchText})`, "gi");
                        const sentenceWithHighlightedSearchText = s.replace(
                          regex,
                          '<span class="text-red-500">$1</span>'
                        );
                        return (
                          <li
                            key={i}
                            dangerouslySetInnerHTML={{
                              __html: sentenceWithHighlightedSearchText,
                            }}
                          />
                        );
                      })
                    : "Bunday gaplar yo'q"}
                </ul>
              </details>

              <details className="mt-2">
                <summary className="cursor-pointer text-blue-600">
                  🔍Aynan shu so‘z ishtirok etgan gaplar
                </summary>
                <ul className="list-disc ml-5 mt-2">
                  {doc.fullSentences.length !== 0
                    ? doc.fullSentences.map((s, i) => {
                        // Qidirilgan so'zni topish va uning rangini o'zgartirish
                        const regex = new RegExp(`(${searchText})`, "gi");
                        const sentenceWithHighlightedSearchText = s.replace(
                          regex,
                          '<span class="text-red-500">$1</span>'
                        );
                        return (
                          <li
                            key={i}
                            dangerouslySetInnerHTML={{
                              __html: sentenceWithHighlightedSearchText,
                            }}
                          />
                        );
                      })
                    : "Bunday gaplar yo'q"}
                </ul>
              </details>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchType;
