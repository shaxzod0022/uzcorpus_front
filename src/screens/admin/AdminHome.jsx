import React from "react";
import AdminData from "../../components/admin/AdminData";
import CreateDocument from "../../components/admin/CreateDocument";
import GetDocument from "../../components/admin/GetDocument";
import TypeAndSubcorpus from "../../components/admin/TypeAndSubcorpus";

export const AdminHome = () => {
  return (
    <div className="flex flex-col gap-5 p-5 w-full bg-black">
      <AdminData />
      <TypeAndSubcorpus />
      <CreateDocument />
      <GetDocument />
    </div>
  );
};
