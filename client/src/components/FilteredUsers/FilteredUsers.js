import React, { useReducer, useState } from "react";
import Modal from "../Modal/Modal";
import "./FilteredUsers.css";

const initialState = {
  name: "",
  phone: "",
  id: "",
  ip: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "name":
      return { ...state, name: action.payload };
    case "phone":
      return { ...state, phone: action.payload };
    case "id":
      return { ...state, id: action.payload };
    case "ip":
      return { ...state, ip: action.payload };
    case "reset":
      return initialState;

    default:
      return state;
  }
};

const FilteredUsers = ({ applyFilters }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [show, setShow] = useState(false);

  const handleChange = (e) => {
    dispatch({ type: e.target.name, payload: e.target.value });
  };

  const handleApply = () => {
    applyFilters(state);
  };

  const onReset = () => {
    dispatch({ type: "reset" });
    applyFilters(initialState);
  };

  return (
    <div>
      <div className="filteredContainer">
        <div className="fieldContainer">
          <label htmlFor="name">Search by Name</label>
          <input
            className="input"
            name="name"
            id="name"
            placeholder="Enter name"
            onChange={handleChange}
            value={state.name}
          />
        </div>

        <div className="fieldContainer">
          <label htmlFor="phone">Search by Phone</label>
          <input
            className="input"
            name="phone"
            id="phone"
            placeholder="Enter phone"
            onChange={handleChange}
            value={state.phone}
          />
        </div>

        <div className="fieldContainer">
          <label htmlFor="id">Search by ID</label>
          <input
            className="input"
            name="id"
            id="id"
            placeholder="Enter id"
            onChange={handleChange}
            value={state.id}
          />
        </div>

        <div className="fieldContainer">
          <label htmlFor="location">Search by IP</label>
          <input
            className="input"
            name="ip"
            id="ip"
            placeholder="Enter ip"
            onChange={handleChange}
            value={state.ip}
          />
        </div>
      </div>
      <div className="buttonsContainer">
        <button type="button" onClick={handleApply}>
          Apply
        </button>
        <button type="button" onClick={onReset}>
          Reset
        </button>
        <button type="button" onClick={() => setShow(true)}>
          Add user
        </button>
      </div>
      {show && <Modal closeModal={setShow} title={"Add New User"} />}
    </div>
  );
};

export default FilteredUsers;
