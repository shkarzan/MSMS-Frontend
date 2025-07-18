// components/Inventory.js
import React, { useEffect, useState } from "react";
import "../Css/Inventory.css";
import { useNavigate } from "react-router-dom";

import { NotificationManager } from "react-notifications";
import CommonTable from "./CommonTable";
import api from "../api";

const Inventory = ({ isAdmin }) => {
  const navigate = useNavigate();
  const [meds, setMed] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const loadMeds = async () => {
    await api
      .get(`/medicine/all`)
      .then((res) => {
        setMed(res.data);
      })
      .catch((err) => {
        NotificationManager.error("Error Message : " + err);
      });
  };

  const removeMed = async (medCode) => {
    await api
      .delete(`/medicine/delete/${medCode}`)
      .then((res) => {
        NotificationManager.success(res.data);
      })
      .catch((err) => {
        NotificationManager.error(err.response.data.ErrorMessage);
      });
    loadMeds();
  };
  const filteredMeds = meds.filter((med) =>
    med.medName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  useEffect(() => {
    loadMeds();
  }, []);
  return (
    <div className="inventory-container">
      {/* <Sidebar logout={logout} name={name} isAdmin={isAdmin} /> */}
      <div className="inventory">
        <h1>Inventory</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by Medicine Name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="buttons">
          <button onClick={() => navigate("/addMedicine")}>Add Medicine</button>
          <button
            onClick={() => navigate("/updateMedicine")}
            disabled={!isAdmin}
          >
            Update Medicine
          </button>
        </div>
        <CommonTable
          tableHeader={[
            "Medicine Code",
            "Medicine Name",
            "Quantity",
            "Price",
            "Expiry Date",
            "Action",
          ]}
          aob={filteredMeds}
          removeFun={removeMed}
          data={"inventory"}
          isAdmin={isAdmin}
        />
      </div>
    </div>
  );
};

export default Inventory;
