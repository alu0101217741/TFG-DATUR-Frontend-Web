import React from "react";
import Breadcrumb from "../Breadcrumb";
import Footer from "../Footer";
import SectionMainNavbar from "../SectionMainNavbar";
import SectionNavbar from "../SectionNavbar";
import TouristNumberContent from "../touristNumber/TouristNumberContent";
import TouristNumberGraph from "../touristNumber/TouristNumberGraph";
import TouristNumberTitle from "../touristNumber/TouristNumberTitle";

export default function TouristNumber() {
  return (
    <div>
      <SectionMainNavbar activeLink={"/numero-de-turistas"} />
      <SectionNavbar activeLink="/numero-de-turistas" />
      <TouristNumberTitle />
      <Breadcrumb
        breadcrumItem={"NÚMERO DE TURISTAS"}
        breadcrumItemLink={"/numero-de-turistas"}
      />
      <TouristNumberContent />
      <TouristNumberGraph />
      <Footer />
    </div>
  );
}
