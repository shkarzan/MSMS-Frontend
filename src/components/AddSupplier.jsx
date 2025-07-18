import React, { useState } from "react";
import "../Css/AddMedicine.css";
import { NotificationManager } from "react-notifications";
import { useNavigate } from "react-router-dom";
import api from "../api";

const AddSupplier = () => {
  const navigate = useNavigate();
  const [supplier, setSupplier] = useState({
    supplierName: "",
    supplierNumber: 0,
  });


  const handleChange = (e) => {
    setSupplier({ ...supplier, [e.target.name]: e.target.value });
  };

  const saveSupplier = async (e) => {
    e.preventDefault();
    await api
      .post(`/supplier/add`, supplier)
      .then(() => {
        NotificationManager.success("Supplier Added Successfully", "", 1000);
      })
      .catch((err) => {
        NotificationManager.error(err);
      });
    navigate("/suppliers");
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={(e) => saveSupplier(e)}>
        <h2>Add Supplier Details</h2>
        <div className="form-group">
          <label htmlFor="name">Supplier Name:</label>
          <input
            type="text"
            id="name"
            name="supplierName"
            required
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Supplier Number:</label>
          <input
            type="text"
            name="supplierNumber"
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Add Supplier
        </button>
        <button
          onClick={() => navigate("/suppliers")}
          className="submit-button"
        >
          Back
        </button>
      </form>
    </div>
  );
};

export default AddSupplier;
