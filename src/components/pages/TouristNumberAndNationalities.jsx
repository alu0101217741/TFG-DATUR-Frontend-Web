import React from "react";
import Breadcrumb from "../Breadcrumb";
import SectionMainNavbar from "../SectionMainNavbar";
import SectionNavbar from "../SectionNavbar";
import TouristNumberAndNationalitiesContent from "../TouristNumberAndNationalitiesContent";
import TouristNumberAndNationalitiesTitle from "../TouristNumberAndNationalitiesTitle";

export default function TouristNumberAndNationalities() {
  return (
    <div>
      <SectionMainNavbar />
      <SectionNavbar />
      <TouristNumberAndNationalitiesTitle />
      <Breadcrumb />
      <TouristNumberAndNationalitiesContent />
    </div>
  );
}
