import React from "react";

const fieldTranslations = {
  title: "Hujjat nomi",
  author: "Muallif nomi",
  yearCreated: "Yaratilgan yil",
  domain: "Faoliyat sohasi",
  topic: "Hujjat mavzusi",
  eventLocationTime: "Zamon va joy",
  genre: "Hujjat turi",
  type: "Hujjat janri",
  style: "Hujjat stili",
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

const DataTableList = ({ data, newClass }) => {
  return (
    <div className={`space-y-8 mt-6`}>
      {data.map((item, index) => (
        <div
          key={index}
          className={`border ${
            newClass ? "border-white text-white" : ""
          } rounded-lg shadow-sm p-4`}
        >
          <h2 className={`text-lg  font-semibold mb-2`}>{item.title}</h2>
          <table className="table-auto w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-600 text-left">
                <th className="p-2 border sm:block hidden">Maydon</th>
                <th className="p-2 border">Qiymat</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(item).map(([key, value]) => (
                <tr key={key}>
                  <td className="p-2 border font-medium sm:block hidden">
                    {fieldTranslations[key] || key}
                  </td>
                  <td className="p-2 border">
                    {typeof value === "object" && value !== null
                      ? value.name || JSON.stringify(value)
                      : typeof value === "string" && value.length > 100
                      ? value.slice(0, 100) + "..."
                      : value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default DataTableList;
