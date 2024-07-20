import React from "react";
import { Navbar, NavbarBrand, Button } from "reactstrap";
import LogoWhite from "../assets/images/logos/xtremelogowhite.svg";
import user1 from "../assets/images/users/user1.jpg";

const Header: React.FC = () => {
  const showMobilemenu = () => {
    const sidebarArea = document.getElementById("sidebarArea");
    if (sidebarArea) {
      sidebarArea.classList.toggle("showSidebar");
    }
  };
  return (
    <Navbar color="primary" dark expand="md">
      <div className="d-flex align-items-center">
        <NavbarBrand href="/" className="d-lg-none">
          <LogoWhite />
        </NavbarBrand>
        <Button
          color="primary"
          className="d-lg-none"
          onClick={() => showMobilemenu()}
        >
          <i className="bi bi-list"></i>
        </Button>
      </div>
      <img
        src={user1}
        alt="profile"
        className="rounded-circle"
        width="30"
      ></img>
    </Navbar>
  );
};

export default Header;
