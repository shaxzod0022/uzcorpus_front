import React, { useEffect, useState } from "react";
import verifyAdmin from "../../service/verifyAdmin";
import { useLocation, useNavigate } from "react-router";
import Message from "../Message";

const AdminData = () => {
  const pathname = useLocation().pathname;

  const [adminData, setAdminData] = useState(null);
  const [values, setValues] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccesMessage] = useState(null);
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    const storedAdmin = JSON.parse(sessionStorage.getItem("admin"));
    if (storedAdmin) {
      setAdminData(storedAdmin);
      setValues({
        fullName: storedAdmin.admin.fullName || "",
        email: storedAdmin.admin.email || "",
        password: "",
      });
    }
  }, [pathname]);

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      setIsLoad(true);
      const res = await verifyAdmin.put(
        `/admin/update/${adminData.admin.id}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${adminData?.token}`,
          },
        }
      );

      setSuccesMessage("Ma'lumotlar muvaffaqiyatli yangilandi!");
      setTimeout(() => setSuccesMessage(null), 3000);

      const updatedAdmin = {
        ...adminData,
        ...values,
      };

      setAdminData(updatedAdmin); // holatni yangilash
    } catch (error) {
      console.error(error);
      setErrorMessage("Xatolik yuz berdi: " + error.message);
      setTimeout(() => setErrorMessage(null), 3000);
    } finally {
      setIsLoad(false);
    }
  };

  const logout = () => {
    sessionStorage.removeItem("admin");
    navigate("/admin");
  };

  return (
    <div className="p-4 max-w-lg mx-auto border-2 border-white rounded-xl text-white">
      <Message successMessage={successMessage} errorMessage={errorMessage} />
      <h2 className="text-xl font-bold mb-4 text-center">Admin Ma'lumotlari</h2>
      <label htmlFor="">To'liq ism</label>
      <input
        type="text"
        name="fullName"
        value={values.fullName}
        onChange={handleChange}
        placeholder="To‘liq ism"
        className="w-full border p-2 mb-3 border-white/50 rounded outline-none"
      />
      <label htmlFor="">Email</label>
      <input
        type="email"
        name="email"
        value={values.email}
        onChange={handleChange}
        placeholder="Email"
        className="w-full border p-2 mb-3 border-white/50 rounded outline-none"
      />
      <label htmlFor="">Parol</label>
      <input
        type="password"
        name="password"
        value={values.password}
        onChange={handleChange}
        placeholder="Password"
        className="w-full border p-2 mb-3 border-white/50 rounded outline-none"
      />
      <div>
        <button
          onClick={handleUpdate}
          disabled={isLoad}
          className={`bg-blue-600 mr-3 cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-700 ${
            isLoad ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoad ? "Yangilanmoqda..." : "Yangilash"}
        </button>
        <button
          onClick={logout}
          className="bg-amber-600 cursor-pointer hover:bg-amber-400 p-2 rounded-md"
        >
          Profildan chiqish
        </button>
      </div>
    </div>
  );
};

export default AdminData;
