import React from "react";
import { Container } from "@mui/material";
import Header from "../components/common/Header";
import HomeBody from "../components/home/HomeBody";
import Footer from "../components/common/Footer";

function Home() {
  return (
    <div className="App">
      <Header></Header>
      <HomeBody></HomeBody>
      <Footer></Footer>
    </div>
  );
}

export default Home;
