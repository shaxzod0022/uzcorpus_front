import React, { useEffect, useState } from "react";
import api from "../../service/verifyAdmin";

const TypeAndSubcorpus = () => {
  const [types, setTypes] = useState([]);
  const [subcorpusList, setSubcorpusList] = useState([]);
  const [newType, setNewType] = useState("");
  const [newSubcorpus, setNewSubcorpus] = useState("");
  const [editTypeId, setEditTypeId] = useState(null);
  const [editSubcorpusId, setEditSubcorpusId] = useState(null);
  const [editTypeValue, setEditTypeValue] = useState("");
  const [editSubcorpusValue, setEditSubcorpusValue] = useState("");

  const fetchAll = async () => {
    const [typeRes, subcorpusRes] = await Promise.all([
      api.get("/types"),
      api.get("/subcorpus"),
    ]);
    setTypes(typeRes.data);
    setSubcorpusList(subcorpusRes.data);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleAddType = async () => {
    if (!newType.trim()) return;
    await api.post("/types/create", { name: newType });
    setNewType("");
    fetchAll();
  };

  const handleAddSubcorpus = async () => {
    if (!newSubcorpus.trim()) return;
    await api.post("/subcorpus/create", { name: newSubcorpus });
    setNewSubcorpus("");
    fetchAll();
  };

  const handleDelete = async (id, type) => {
    await api.delete(`/${type}/delete/${id}`);
    fetchAll();
  };

  const handleUpdate = async (id, value, type) => {
    if (!value.trim()) return;
    await api.put(`/${type}/update/${id}`, { name: value });
    if (type === "types") {
      setEditTypeId(null);
      setEditTypeValue("");
    } else {
      setEditSubcorpusId(null);
      setEditSubcorpusValue("");
    }
    fetchAll();
  };

  return (
    <div className="p-4 max-w-4xl mx-auto text-white">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Janr va corpuslarni boshqarish
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Type qismi */}
        <div className="border p-4 rounded-lg border-white/30">
          <h3 className="text-xl font-semibold mb-3">Matn janrlari (Types)</h3>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newType}
              onChange={(e) => setNewType(e.target.value)}
              placeholder="Yangi matn janri"
              className="flex-grow border p-2 rounded bg-white/10 border-white/30 outline-none"
            />
            <button
              onClick={handleAddType}
              className="bg-green-600 px-3 py-1 rounded cursor-pointer"
            >
              Qo‘shish
            </button>
          </div>
          <ul className="space-y-2">
            {types.map((type) => (
              <li
                key={type._id}
                className="flex justify-between items-center gap-2"
              >
                {editTypeId === type._id ? (
                  <>
                    <input
                      type="text"
                      value={editTypeValue}
                      onChange={(e) => setEditTypeValue(e.target.value)}
                      className="flex-grow border p-1 rounded text-white"
                    />
                    <button
                      onClick={() =>
                        handleUpdate(type._id, editTypeValue, "types")
                      }
                      className="text-green-500 cursor-pointer"
                    >
                      💾
                    </button>
                    <button
                      onClick={() => setEditTypeId(null)}
                      className="text-red-500 cursor-pointer"
                    >
                      ❌
                    </button>
                  </>
                ) : (
                  <>
                    <span>{type.name}</span>
                    <div className="space-x-2">
                      <button
                        className="cursor-pointer"
                        onClick={() => {
                          setEditTypeId(type._id);
                          setEditTypeValue(type.name);
                        }}
                      >
                        ✏️
                      </button>
                      <button
                        className="cursor-pointer"
                        onClick={() => handleDelete(type._id, "types")}
                      >
                        🗑️
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Subcorpus qismi */}
        <div className="border p-4 rounded-lg border-white/30">
          <h3 className="text-xl font-semibold mb-3">
            Korpus bo‘limlari (Subcorpus)
          </h3>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newSubcorpus}
              onChange={(e) => setNewSubcorpus(e.target.value)}
              placeholder="Yangi korpus bo‘limi"
              className="flex-grow border p-2 rounded bg-white/10 border-white/30 outline-none"
            />
            <button
              onClick={handleAddSubcorpus}
              className="bg-green-600 px-3 py-1 rounded cursor-pointer"
            >
              Qo‘shish
            </button>
          </div>
          <ul className="space-y-2">
            {subcorpusList.map((sub) => (
              <li
                key={sub._id}
                className="flex justify-between items-center gap-2"
              >
                {editSubcorpusId === sub._id ? (
                  <>
                    <input
                      type="text"
                      value={editSubcorpusValue}
                      onChange={(e) => setEditSubcorpusValue(e.target.value)}
                      className="flex-grow border p-1 rounded text-white"
                    />
                    <button
                      onClick={() =>
                        handleUpdate(sub._id, editSubcorpusValue, "subcorpus")
                      }
                      className="text-green-500 cursor-pointer"
                    >
                      💾
                    </button>
                    <button
                      onClick={() => setEditSubcorpusId(null)}
                      className="text-red-500 cursor-pointer"
                    >
                      ❌
                    </button>
                  </>
                ) : (
                  <>
                    <span>{sub.name}</span>
                    <div className="space-x-2">
                      <button
                        className="cursor-pointer"
                        onClick={() => {
                          setEditSubcorpusId(sub._id);
                          setEditSubcorpusValue(sub.name);
                        }}
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(sub._id, "subcorpus")}
                        className="cursor-pointer"
                      >
                        🗑️
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TypeAndSubcorpus;
