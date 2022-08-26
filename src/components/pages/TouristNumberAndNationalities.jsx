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
      <SectionMainNavbar activeLink={"/numero-de-turistas-y-nacionalidades"} />
      <SectionNavbar activeLink="/numero-de-turistas-y-nacionalidades" />
      <TouristNumberAndNationalitiesTitle />
      <Breadcrumb
        breadcrumItem={"NÚMERO DE TURISTAS Y NACIONALIDADES"}
        breadcrumItemLink={"/numero-de-turistas-y-nacionalidades"}
      />
      <TouristNumberAndNationalitiesContent />
      <TouristNumberAndNationalitiesGraph />
      <Footer />
    </div>
  );
}
