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
import styles from './MainMenu.module.scss';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import logo from '../../../img/brand/brand.png';

const MainMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const user = useSelector((state) => state.user);
  console.log(user);


  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.mainMenu}>
      <Navbar expand="md" className="animated fadeIn">
        <NavbarBrand className={styles.navbarBrand}>
          <img src={logo} alt="Logo" className={styles.logo} />
        </NavbarBrand>
        <NavbarToggler className="ms-auto" onClick={toggle}>
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
              </>
            )}
            <NavItem>
              <NavLink href="/cart">
                <Button className="btn-outline" outline color="warning">
                  <FontAwesomeIcon icon={faShoppingBasket} />
                </Button>
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default MainMenu;
