import React from "react";
import Breadcrumb from "../Breadcrumb";
import Footer from "../Footer";
import SectionMainNavbar from "../SectionMainNavbar";
import SectionNavbar from "../SectionNavbar";
import TouristSpendingContent from "../touristSpending/TouristSpendingContent";
import TouristSpendingGraph from "../touristSpending/TouristSpendingGraph";
import TouristSpendingTitle from "../touristSpending/TouristSpendingTitle";

export default function TouristSpending() {
  return (
    <div>
      <SectionMainNavbar />
      <SectionNavbar activeLink="/gasto-turistico" />
      <TouristSpendingTitle />
      <Breadcrumb
        breadcrumItem={"GASTO TURÍSTICO"}
        breadcrumItemLink={"/gasto-turistico"}
      />
      <TouristSpendingContent />
      <TouristSpendingGraph />
      <Footer />
    </div>
  );
}
