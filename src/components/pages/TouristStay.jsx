import React from "react";
import Breadcrumb from "../Breadcrumb";
import Footer from "../Footer";
import SectionMainNavbar from "../SectionMainNavbar";
import SectionNavbar from "../SectionNavbar";
import TouristStayContent from "../touristStay/TouristStayContent";
import TouristStayGraph from "../touristStay/TouristStayGraph";
import TouristStayTitle from "../touristStay/TouristStayTitle";

export default function TouristStay() {
  return (
    <div>
      <SectionMainNavbar />
      <SectionNavbar activeLink="/estancia-turistica" />
      <TouristStayTitle />
      <Breadcrumb
        breadcrumItem={"ESTANCIA TURÍSTICA"}
        breadcrumItemLink={"/estancia-turistica"}
      />
      <TouristStayContent />
      <TouristStayGraph />
      <Footer />
    </div>
  );
}
