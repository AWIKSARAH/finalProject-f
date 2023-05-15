import React from "react";
import ai from "../../assets/ai.png";
import "./header.css";

const Header = () => (
  <div className="gpt3__header section__padding" id="home">
    <div className="gpt3__header-content">
      <h1 className="gradient__text">
        FindLost: Help
        <span className="axente__gpt3"> Locate </span>
        Missing People After Disasters{" "}
      </h1>
      <p>
        FindLost is an innovative platform that leverages AI technology to aid
        in the search and rescue efforts during and after disasters. Join us in
        our mission to reunite families and save lives.
      </p>

      <div className="gpt3__header-content__input">
        <button type="button">Get Started</button>
      </div>
    </div>

    <div className="gpt3__header-image">
      <img src={ai} />
    </div>
  </div>
);

export default Header;
