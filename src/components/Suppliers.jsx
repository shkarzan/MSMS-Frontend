// components/Inventory.js
import React, { useEffect, useState } from "react";
import "../Css/Inventory.css";
import { useNavigate } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import CommonTable from "./CommonTable";
import api from "../api";

const Suppliers = ({ isAdmin }) => {
  const navigate = useNavigate();
  const url = "/api/supplier";
  const [suppliers, setSuppliers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const loadSuppliers = async () => {
    await api
      .get(`/supplier/all`)
      .then((res) => {
        setSuppliers(res.data);
      })
      .catch((err) => {
        NotificationManager.error("Error Message : " + err);
      });
  };

  const removeSupplier = async (medCode) => {
    await api
      .delete(`/supplier/delete/${medCode}`)
      .then((res) => {
        NotificationManager.success(res.data);
      })
      .catch((err) => {
        NotificationManager.error(err.response.data.ErrorMessage);
      });
    loadSuppliers();
  };
  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.supplierName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  useEffect(() => {
    loadSuppliers();
  }, []);
  return (
    <div className="inventory-container">
      {/* <Sidebar logout={logout} name={name} isAdmin={isAdmin} /> */}
      <div className="inventory">
        <h1>Suppliers</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by Supplier Name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="buttons">
          <button onClick={() => navigate("/addSupplier")}>Add Supplier</button>
          <button
            onClick={() => navigate("/updateSupplier")}
            disabled={!isAdmin}
          >
            Update Supplier
          </button>
        </div>
        <CommonTable
          tableHeader={[
            "Supplier ID",
            "Supplier Name",
            "Supplier Number",
            "Supplier Email",
            "Action",
          ]}
          aob={filteredSuppliers}
          removeFun={removeSupplier}
          data={"supplier"}
          isAdmin={isAdmin}
        />
      </div>
    </div>
  );
};

export default Suppliers;
