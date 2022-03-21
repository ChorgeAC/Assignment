import React, { useState } from "react";
import "./tableHeading.css";

const TableHeading = ({ members, dispatch }) => {
  const [showCompony, setShowCompony] = useState(false);
  const [showStatus, setShowStatus] = useState(false);

  const handleCheck = (e) => {
    dispatch({
      type: "COMPONY_CHECK",
      payload: { checked: e.target.checked, compony: e.target.name },
    });
  };

  const handleStatus = (e) => {
    dispatch({
      type: "SORT_STATUS",
      payload: { checked: e.target.checked, status: e.target.name },
    });
  };

  return (
    <div>
      <div className="navbar">
        <div className="navForCompony">
          <label>Compony</label>
          <label>
            ({members.filter((item) => item.isChecked === true).length})
          </label>
          <button
            onClick={() => setShowCompony(!showCompony)}
            style={{ backgroundColor: "transparent", border: "none" }}
          >
            ^
          </button>
        </div>
        {showCompony && (
          <div className="componyContainer">
            <div style={{ padding: "0 0.5rem" }}>
              <input
                type="checkbox"
                checked={
                  members.filter((item) => item.isChecked !== true).length < 1
                }
                name={"allChecked"}
                onChange={(e) => handleCheck(e)}
              />
              <label>Select all</label>
            </div>
            {members.map((item) => {
              return (
                <div key={item.id} className="itmes">
                  <input
                    type="checkbox"
                    checked={item.isChecked || false}
                    name={item.compony}
                    onChange={(e) => handleCheck(e)}
                  />
                  <label>{item.compony}</label>
                </div>
              );
            })}
          </div>
        )}
        <div className="navForStatus">
          <label>Status</label>
          <button
            onClick={() => setShowStatus(!showStatus)}
            style={{ backgroundColor: "transparent", border: "none" }}
          >
            ^
          </button>
          {showStatus && (
            <div className="statusContainer">
              <div>
                <input
                  type="checkbox"
                  name={"Active"}
                  onClick={(e) => handleStatus(e)}
                />
                <label>Active</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  name={"Closed"}
                  onClick={(e) => handleStatus(e)}
                />
                <label>Closed</label>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TableHeading;
