import React from "react";
import Breadcrumb from "../Breadcrumb";
import Footer from "../Footer";
import SectionMainNavbar from "../SectionMainNavbar";
import SectionNavbar from "../SectionNavbar";
import TouristNumberAndNationalitiesContent from "../touristNumberAndNationalities/TouristNumberAndNationalitiesContent";
import TouristNumberAndNationalitiesGraph from "../touristNumberAndNationalities/TouristNumberAndNationalitiesGraph";
import TouristNumberAndNationalitiesTitle from "../touristNumberAndNationalities/TouristNumberAndNationalitiesTitle";

export default function TouristNumberAndNationalities() {
  return (
    <div>
      <SectionMainNavbar activeLink={"/numero-de-turistas"} />
      <SectionNavbar activeLink="/numero-de-turistas" />
      <TouristNumberAndNationalitiesTitle />
      <Breadcrumb
        breadcrumItem={"NÚMERO DE TURISTAS Y NACIONALIDADES"}
        breadcrumItemLink={"/numero-de-turistas"}
      />
      <TouristNumberAndNationalitiesContent />
      <TouristNumberAndNationalitiesGraph />
      <Footer />
    </div>
  );
}
