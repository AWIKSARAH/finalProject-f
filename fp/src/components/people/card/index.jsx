import React from "react";
import "./style.css";
import logo from '../../../assets/ai.png'
const Card = ({ name }) => (
  <div
    className="card card0"
    style={{
      backgroundImage: `url(${logo})`,
      // backgroundSize: "300px",
      // ':hover': {
      //   backgroundImage:
      //   'url("https://i.pinimg.com/originals/28/d2/e6/28d2e684e7859a0dd17fbd0cea00f8a9.jpg")',
      //   backgroundSize: '600px',
      // },
    }}
  >
    <div className="border">
      <h2>{"name"}</h2>
      <div className="icons">
        <i className="fa" aria-hidden="true"></i>
        <i className="fa " aria-hidden="true"></i>
        <i className="fa " aria-hidden="true"></i>
        <i className="fa " aria-hidden="true"></i>
        <i className="fa " aria-hidden="true"></i>
      </div>
    </div>
  </div>
);

export default Card;
