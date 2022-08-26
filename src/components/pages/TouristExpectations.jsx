import React from "react";
import Breadcrumb from "../Breadcrumb";
import Footer from "../Footer";
import SectionMainNavbar from "../SectionMainNavbar";
import SectionNavbar from "../SectionNavbar";
import BusinessProgressGraph from "../touristExpectations/BusinessProgressGraph";
import OccupancyRateForecastGraph from "../touristExpectations/OccupancyRateForecastGraph";
import TouristExpectationsContent from "../touristExpectations/TouristExpectationsContent";
import TouristExpectationsTitle from "../touristExpectations/TouristExpectationsTitle";

export default function TouristExpectations() {
  return (
    <div>
      <SectionMainNavbar activeLink={"/expectativas-turisticas"} />
      <SectionNavbar activeLink="/expectativas-turisticas" />
      <TouristExpectationsTitle />
      <Breadcrumb
        breadcrumItem={"EXPECTATIVAS TURÍSTICAS"}
        breadcrumItemLink={"/expectativas-turisticas"}
      />
      <TouristExpectationsContent />
      <OccupancyRateForecastGraph />
      <BusinessProgressGraph />
      <Footer />
    </div>
  );
}
