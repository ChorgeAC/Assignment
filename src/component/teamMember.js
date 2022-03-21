import React, { useEffect, useReducer } from "react";
import Header from "./Header";
import "./teamMember.css";
import Modal from "./modal";
import { reducer } from "./reducer";
import Table from "./table";
import TableHeading from "./tableHeading";
import axios from "axios";
import { config } from "../App";
const token = localStorage.getItem("token");

const defaultState = {
  members: [],
  showModal: false,
  removefilter: false,
};

const TeamMember = () => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const { showModal } = state;

  useEffect(() => {
    const getMemmbers = async () => {
      try {
        const res = await axios.get(`${config.endpoint}/user/members`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = res.data;
        dispatch({ type: "GET_MEMBERS", payload: data });
        return;
      } catch (error) {
        console.log("Error");
      }
    };
    getMemmbers();
  }, []);

  useEffect(() => {
    const getMemmbers = async () => {
      try {
        const res = await axios.get(`${config.endpoint}/user/members`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = res.data;
        dispatch({ type: "GET_MEMBERS", payload: data });
        return;
      } catch (error) {
        console.log("Error");
      }
    };
    getMemmbers();
  }, [state.removefilter]);

  return (
    <>
      <Header />
      <div className={showModal ? "showModal" : "container_team"}>
        <div className="title">
          <h1>Team Members</h1>
          <button
            onClick={() => {
              dispatch({ type: "SHOW_MODAL" });
            }}
          >
            Add Members
          </button>
        </div>
        <hr />
        <TableHeading members={state.members} dispatch={dispatch} />
        <Table members={state.members} dispatch={dispatch} />
      </div>
      {showModal && <Modal dispatch={dispatch} />}
    </>
  );
};

export default TeamMember;
