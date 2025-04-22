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
    <div className="space-y-4">
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
          <option value="" className="border-2 border-blue-300">
            Barcha korpuslar
          </option>
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
          className="bg-blue-500 hover:bg-blue-300 active:scale-90 cursor-pointer transition-all duration-200 py-2 px-5 rounded-md text-white font-semibold"
        >
          Qidirish
        </button>
      </div>

      <div className="mt-4">
        {/* Qidiruv amalga oshirilmagan bo‘lsa "Qidiring" ko‘rsatamiz */}
        {!hasSearched ? (
          <p className="text-center font-bold text-2xl py-6">
            Qidiruvni amalga oshiring!
          </p>
        ) : isLoad ? (
          <div className={`flex flex-col items-center mt-16`}>
            <span className={`search__loader`}>Yuklanmoqda...</span>
          </div>
        ) : filteredDocs.length === 0 ? (
          <p className="text-center font-bold text-2xl py-6">
            Hujjat topilmadi
          </p>
        ) : (
          <>
            <div className="flex items-center gap-4 flex-wrap justify-between w-full">
              <div className="p-5 items-center flex flex-col gap-4 border-2 border-blue-300 sm:w-[43%] w-full rounded-md">
                <h2 className="font-semibold text-xl mb-4 text-center">
                  Aynan so'z bo'yicha natijalari
                </h2>
                <div className="flex flex-col items-center gap-2">
                  <span className="font-semibold text-5xl">
                    {filteredDocs.reduce(
                      (sum, doc) => sum + (doc.fullMatchCount || 0),
                      0
                    )}
                  </span>
                  <span className="text-lg ">ta so'z</span>
                </div>
              </div>
              <div className="p-5 items-center flex flex-col gap-4 border-2 border-blue-300 sm:w-[43%] w-full rounded-md">
                <h2 className="font-semibold text-xl mb-4 text-center">
                  So'z shakllari bo'yicha natijalari
                </h2>
                <div className="flex flex-col items-center gap-2">
                  <span className="font-semibold text-5xl">
                    {filteredDocs.reduce(
                      (sum, doc) => sum + (doc.suffixMatchCount || 0),
                      0
                    )}
                  </span>
                  <span className="text-lg ">ta so'z shakllari</span>
                </div>
              </div>
            </div>
            {filteredDocs.map((doc, index) => (
              <div key={index} className="p-4 mb-4">
                <p className="text-lg">
                  <span className="font-bold">{index + 1}. </span>
                  <span className="font-bold">{doc.title} </span>,
                  <span className="font-bold">{doc.author}</span>, janri
                  <span className="font-bold"> {doc.type}</span>, uslubi
                  <span className="font-bold"> {doc.subcorpus}</span>
                </p>
                <p>
                  <strong>Aynan so‘z sifatida:</strong>{" "}
                  {doc.fullMatchCount || 0} marta
                </p>
                <p>
                  <strong>So'z va qo‘shimchalari bilan:</strong>{" "}
                  {doc.suffixMatchCount || 0} marta
                </p>

                <details className="mt-2">
                  <summary className="cursor-pointer text-blue-600">
                    Barcha so'z shakllari bo'yicha qidiruv natijalari
                  </summary>
                  <ul className="list-disc ml-5 mt-2">
                    {doc.suffixSentences.length !== 0
                      ? doc.suffixSentences.map((s, i) => {
                          // Qidirilgan so'zni topish va uning rangini o'zgartirish
                          const regex = new RegExp(`(${searchText})`, "gi");
                          const sentenceWithHighlightedSearchText = s.replace(
                            regex,
                            '<span class="bg-yellow-500">$1</span>'
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
                      : "Bunday jumlalar mavjud emas"}
                  </ul>
                </details>

                <details className="mt-2">
                  <summary className="cursor-pointer text-blue-600">
                    Aynan so'z bo'yicha qidiruv natijalari
                  </summary>
                  <ul className="list-disc ml-5 mt-2">
                    {doc.fullSentences.length !== 0
                      ? doc.fullSentences.map((s, i) => {
                          const regex = new RegExp(
                            `\\b(${searchText})\\b`,
                            "gi"
                          );
                          const sentenceWithHighlightedSearchText = s.replace(
                            regex,
                            '<span class="bg-yellow-500">$1</span>'
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
                      : "Bunday jumlalar mavjud emas"}
                  </ul>
                </details>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchType;
