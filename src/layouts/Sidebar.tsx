import { Button, Nav, NavItem } from "reactstrap";
import Logo from "./Logo";
import { Link, useLocation } from "react-router-dom";

const navigation = [
  {
    title: "Practice",
    href: "/practice",
    icon: "bi bi-keyboard-fill",
  },
  {
    title: "Profile",
    href: "/profile",
    icon: "bi bi-person-circle",
  },
  {
    title: "High Score",
    href: "/high-score",
    icon: "bi bi-patch-check",
  },
  {
    title: "Typing Test",
    href: "/typing-test",
    icon: "bi bi-speedometer2",
  },
  {
    title: "Help",
    href: "/help",
    icon: "bi bi-question-circle-fill",
  },
];

const Sidebar = () => {
  const showMobilemenu = () => {
    document.getElementById("sidebarArea")?.classList.toggle("showSidebar");
  };
  const location = useLocation();

  return (
    <div className="p-3">
      <div className="d-flex align-items-center">
        <Logo />
        <span className="ms-auto d-lg-none">
        <Button
          close
          size="sm"
          className="ms-auto d-lg-none"
          onClick={() => showMobilemenu()}
        ></Button>
        </span>
      </div>
      <div className="pt-4 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link
                to={navi.href}
                className={
                  location.pathname === navi.href
                    ? "text-primary nav-link py-3"
                    : "nav-link text-secondary py-3"
                }
              >
                <i className={navi.icon}></i>
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link>
            </NavItem>
          ))}
          
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
