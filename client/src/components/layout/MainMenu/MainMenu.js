import {
  Button,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { FaBars } from 'react-icons/fa';
import styles from'./MainMenu.module.scss';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const MainMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.user);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Navbar expand="md" className="animated fadeIn">
        <NavbarBrand>
          <img
            src="https://www.zarla.com/images/zarla-our-kitchen-1x1-2400x2400-20210607-7ptg4hq93wcmh4p7dwpx.png?crop=1:1,smart&width=250&dpr=2"
            alt="Logo"
            className={styles.logo}
          />
        </NavbarBrand>
        <NavbarToggler className="position-absolute" onClick={toggle}>
          <FaBars />
        </NavbarToggler>
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ms-auto align-items-center" navbar>
            <NavItem>
              <NavLink href="/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/contact-us">Contact Us</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/about-us">About Us</NavLink>
            </NavItem>
            {!user ? (
              <>
                <NavItem className="d-block d-xl-block">
                  <NavLink href="/sign-up">Sign Up</NavLink>
                </NavItem>
                <NavItem className="d-block d-xl-block">
                  <NavLink href="/sign-in">Sign In</NavLink>
                </NavItem>
              </>
            ) : (
              <>
                <NavItem className="d-block d-xl-block">
                  <NavLink href="/sign-out">Sign Out</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/ad/add">
                    <Button className="btn-outline" outline color="success">
                      Post ad
                    </Button>
                  </NavLink>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default MainMenu;
