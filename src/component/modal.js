import React, { useState } from "react";
import "./modal.css";
import axios from "axios";
import { config } from "../App";
const token = localStorage.getItem("token");

const defaultModal = {
  name: "",
  compony: "",
  status: "",
  date: "",
  note: "",
};
const Modal = ({ dispatch }) => {
  const [modalData, setModalData] = useState(defaultModal);
  const { name, compony, status, note } = modalData;

  const handleChange = (e) => {
    const name = e.target.name;
    setModalData({ ...modalData, [name]: e.target.value });
  };

  const validateModal = (data) => {
    if (data.name === "") {
      alert("Enter name");
      return false;
    }
    if (data.compony === "") {
      alert("Enter compony");
      return false;
    }
    if (data.status === "") {
      alert("Enter status");
      return false;
    }
    if (data.note === "") {
      alert("Enter note");
      return false;
    }
    return true;
  };

  const createDate = () => {
    let currdate = new Date();
    let day = currdate.getDate();
    let month = currdate.getMonth();
    let year = currdate.getFullYear();
    let str = `${day}/${month + 1}/${year}`;
    return str;
  };

  const handleSubmit = async (modalData) => {
    if (validateModal(modalData)) {
      let currDate = createDate();
      const status =
        modalData.status.charAt(0).toUpperCase() + modalData.status.slice(1);
      const data = { ...modalData, date: currDate, status: status };
      try {
        const res = await axios.post(
          `${config.endpoint}/user/members`,
          {
            name: data.name,
            compony: data.compony,
            status: data.status,
            note: data.note,
            date: data.date,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const newMembers = res.data;
        dispatch({ type: "ADD_MEMBER", payload: newMembers });
        setModalData(defaultModal);
        return res.data;
      } catch (error) {
        alert("failure");
      }
    }
  };

  return (
    <>
      <div className="modalContainer">
        <h3>Add Members</h3>
        <div className="inputitems">
          <label>Name</label>
          <input name="name" type="text" value={name} onChange={handleChange} />
        </div>
        <div className="inputitems">
          <label>Compony</label>
          <input
            name="compony"
            type="text"
            value={compony}
            onChange={handleChange}
          />
        </div>
        <div className="inputitems">
          <label>Status</label>
          <input
            name="status"
            type="text"
            value={status}
            onChange={handleChange}
          />
        </div>
        <div className="inputitems">
          <label>Notes</label>
          <input name="note" type="text" value={note} onChange={handleChange} />
        </div>
        <div className="buttonContainer">
          <button
            type="submit"
            className="btnformodal"
            onClick={() => handleSubmit(modalData)}
          >
            save
          </button>
          <button
            className="btncancel"
            onClick={() => {
              dispatch({ type: "CLOSE_MODAL" });
            }}
          >
            cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;

// const addMember = async (data) => {
//   try {
//     const res = await axios.post(
//       `${config.endpoint}/user/members`,
//       {
//         name: data.name,
//         compony: data.compony,
//         status: data.status,
//         note: data.note,
//         date: data.date,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     return res.data;
//   } catch (error) {
//     alert("failure");
//   }
// };
