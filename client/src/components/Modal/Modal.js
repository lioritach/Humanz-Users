import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Modal.css";

const Modal = ({ closeModal, title }) => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [phone, setPhone] = useState("");
  const [ip, setIp] = useState("");
  const [error, setError] = useState("");

  const notifyAddUser = () => toast.info("Done! User added successfully");
  const notifyError = () => toast.error("Error! All fields are required!");

  const addNewUser = async (name, phone, id, ip) => {
    // check if the fields is empty
    if (!name || !id || !phone || !ip) {
      setError("Error! All fields are required!");
      notifyError();
      return;
    }

    //validations
    if (
      name.match(/[@#^.%*+?^${}()|[\]\\]/g) ||
      id.match(/[/[@#^.%*+?^${}()|[\]\\]/g) ||
      phone.match(/[/[@#^.%*+?^${}()|[\]\\]/g) ||
      ip.match(/[/[@#^.%*+?^${}()|[\]\\]/g)
    ) {
      setError("Error! Use only a-z or A-Z, not special characters!");
      return;
    }

    const newUser = {
      name: name,
      id: id,
      ip: ip,
      phone: phone,
    };

    try {
      await axios
        .post("http://localhost:5000/api/users/", newUser)
        .then(() => notifyAddUser())
        .then(
          setTimeout(() => {
            window.location.replace("/");
          }, 2000)
        );
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className="modal">
      <div className="modal__content">
        <h4 className="modal__title">{title}</h4>
        <div className="modal__footer">
          <div>
            <label htmlFor="name">Name</label>
            <input
              style={{
                border: error ? "3px solid red" : null,
              }}
              required
              name="name"
              id="name"
              placeholder="Enter name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>

          <div>
            <label htmlFor="phone">Phone</label>
            <input
              style={{
                border: error ? "3px solid red" : null,
              }}
              name="phone"
              id="phone"
              placeholder="Enter phone"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
            />
          </div>

          <div>
            <label htmlFor="id">ID</label>
            <input
              style={{
                border: error ? "3px solid red" : null,
              }}
              name="id"
              id="id"
              placeholder="Enter id"
              onChange={(e) => setId(e.target.value)}
              value={id}
            />
          </div>

          <div>
            <label htmlFor="ip">IP</label>
            <input
              style={{
                border: error ? "3px solid red" : null,
              }}
              name="ip"
              id="ip"
              placeholder="Enter ip"
              onChange={(e) => setIp(e.target.value)}
              value={ip}
            />
          </div>

          <p style={{ color: "red" }}>{error}</p>
          <div className="btns">
            <button
              className="btn"
              onClick={() => addNewUser(name, phone, id, ip)}
            >
              Save
            </button>
            <button className="btn" onClick={() => closeModal(false)}>
              Cancel
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Modal;
