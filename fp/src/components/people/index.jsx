import React from "react";
import './card/style.css'
import Card from "./card";
const Container = () => (
    <div className="container">
      <Card name="Al Pacino" />
      <Card name="Ben Stiller" />
      <Card name="Patrick Stewart" />
    </div>
  );
  
  export default Container;