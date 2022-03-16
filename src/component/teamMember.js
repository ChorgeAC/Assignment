import React from "react";
import Header from "./Header";
import "./teamMember.css";

const TeamMember = () => {
  return (
    <>
      <Header />
      <div className="container_team">
        <div className="title">
          <h1>Team Members</h1>
          <button>Add Members +</button>
        </div>
        <hr />
      </div>
    </>
  );
};

export default TeamMember;
