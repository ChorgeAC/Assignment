import React from "react";
import "./table.css";
import axios from "axios";
import { config } from "../App";
const token = localStorage.getItem("token");

const Table = ({ members, dispatch }) => {
  const removeMember = async (memberId) => {
    if (!token) {
      alert("loggin to proceed");
      return;
    }
    try {
      const res = await axios.delete(
        `${config.endpoint}/user/members/${memberId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const newMembers = res.data;
      dispatch({ type: "REMOVE_MEMBER", payload: newMembers });
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <>
      {members.length !== 0 && (
        <div className="tableContainer">
          <table>
            <thead>
              <tr>
                <th>
                  <input type="checkbox" />
                </th>
                <th>Name</th>
                <th>Compony</th>
                <th>Status</th>
                <th>Last update</th>
                <th>Notes</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {members.map((item) => {
                const { id, name, compony, status, date, note } = item;
                return (
                  <tr
                    key={id}
                    className={status === "Active" ? "activeRow" : null}
                  >
                    <td>
                      <input
                        type="checkbox"
                        checked={item.isChecked || false}
                        readOnly
                      />
                    </td>
                    <td>{name}</td>
                    <td>{compony}</td>
                    <td>{status}</td>
                    <td>{date}</td>
                    <td>{note}</td>
                    <td>
                      <button
                        className="btnDelete"
                        onClick={() => removeMember(id)}
                      >
                        <img src="/icons8-delete-30.png" alt="delete" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Table;
