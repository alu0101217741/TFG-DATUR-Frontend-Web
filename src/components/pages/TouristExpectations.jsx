import React from "react";
import Breadcrumb from "../Breadcrumb";
import SectionMainNavbar from "../SectionMainNavbar";
import SectionNavbar from "../SectionNavbar";
import TouristExpectationsContent from "../touristExpectations/TouristExpectationsContent";
import TouristExpectationsTitle from "../touristExpectations/TouristExpectationsTitle";

export default function TouristExpectations() {
  return (
    <div>
      <SectionMainNavbar />
      <SectionNavbar activeLink="/expectativas-turisticas" />
      <TouristExpectationsTitle />
      <Breadcrumb
        breadcrumItem={"EXPECTATIVAS TURÍSTICAS"}
        breadcrumItemLink={"/expectativas-turisticas"}
      />
      <TouristExpectationsContent />
    </div>
  );
}
