import React from "react";
import CardsGroup from "../CardsGroup";
import Footer from "../Footer";
import "../Graphics/highchartSettings";
import SectionMainNavbar from "../SectionMainNavbar";
import SloganSection from "../SloganSection";

function Home() {
  return (
    <>
      <SectionMainNavbar activeLink={"/"} />
      <SloganSection />
      <CardsGroup />
      <Footer />
    </>
  );
}

export default Home;
