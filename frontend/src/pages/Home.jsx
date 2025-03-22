import React from "react";
import FormList from "../components/FormList/FormList";

const Home = () => {
  return (
    <div>
      <h2 style={{ textAlign: "center", marginTop: "20px" }}>
        Welcome to Form Builder
      </h2>
      <FormList />
    </div>
  );
};

export default Home;
