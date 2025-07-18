// components/Sales.js
import React, { useEffect, useState } from "react";
import "../Css/Sales.css";
import api from "../api";
import { NotificationManager } from "react-notifications";

const Invoices = () => {
  const url = "/api/invoice";
  const getPdf = async (salesId) => {
    // console.log(invoices);

    await api
      .get(`/invoice/get/${salesId}`, {
        responseType: "blob",
      })
      .then((response) => {
        if (response.status === 200) {
          const fileUrl = URL.createObjectURL(response.data);
          const newTab = window.open();
          newTab.document.write(
            `<iframe src="${fileUrl}" width="100%" height="100%" style="border: none;"></iframe>`
          );
        } else {
          throw new Error("Failed to fetch PDF");
        }
      })
      .catch((err) => {
        console.error("Error fetching PDF:", err);
      });
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [invoices, setInvoices] = useState([]);

  const loadAllInvoices = async () => {
    await api
      .get(`/invoice/all`)
      .then((res) => {
        setInvoices(res.data);
      })
      .catch((err) => {
        NotificationManager.error("Error Message : " + err);
      });
  };

  useEffect(() => {
    loadAllInvoices();
  }, []);

  const filteredInvoices = invoices.filter((invoice) => {
    return invoice.salesId.toString().includes(searchTerm);
  });

  const deletePdf = async (salesId) => {
    await api
      .delete(`/invoice/delete/${salesId}`)
      .then((res) => {
        NotificationManager.success(res.data);
        loadAllInvoices();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="sales">
      {/* <Sidebar logout={logout} name={name} isAdmin={isAdmin} /> */}
      <h1>Invoices</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by Sales id"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Sales Id</th>
            <th>Customer Id</th>
            <th>Invoice Pdf</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredInvoices.map((invoice, index) => (
            <tr key={index}>
              <th scope="row">{invoice.salesId}</th>
              <td>{invoice.customerId}</td>
              <td>
                <a
                  className="view-link"
                  onClick={() => getPdf(invoice.salesId)}
                >
                  View Bill
                </a>
              </td>
              <td>
                <button onClick={() => deletePdf(invoice.salesId)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Invoices;
