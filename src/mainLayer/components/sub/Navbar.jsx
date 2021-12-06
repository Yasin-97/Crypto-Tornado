import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  FundOutlined,
  EyeOutlined
} from "@ant-design/icons";
import {BtnToggle} from '../../components'
import icon from "../../../assets/imgs/Cryptornado.png";
const Navbar = ({setTheme}) => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setuser] = useState(false);
  const hamburgerMenu = isMenuOpen ? "hamburger open" : "hamburger";
  const showMenu = isMenuOpen ? " navbar-open" : "";

  const closeMenu = () => setIsMenuOpen(!isMenuOpen);
  return (
    <>
      <div className="nav">
        <div className="logo-container">
          <Link to="/">
            <img src={icon} />
          </Link>
          <Link to="/">
            <h3 className="text-logo">CrypTornado</h3>
          </Link>
        </div>
        <div className={hamburgerMenu} onClick={closeMenu}>
          <div></div>
        </div>
        <nav className={`navbar ${showMenu}`}>
        <BtnToggle setTheme={setTheme}/>
        <Link to="/watchlist" onClick={closeMenu} className="navbar-item">
            <HomeOutlined /> Watchlist
          </Link>
          <Link to="/" onClick={closeMenu} className="navbar-item">
            <EyeOutlined /> Glance
          </Link>
          <Link
            to="/cryptocurrencies"
            onClick={closeMenu}
            className="navbar-item"
          >
            <FundOutlined /> Cryptocurrencies
          </Link>
          <Link to="/exchanges" onClick={closeMenu} className="navbar-item">
            <MoneyCollectOutlined /> Exchanges
          </Link>
          <Link to="/news" onClick={closeMenu} className="navbar-item" style={{marginBottom:'2rem'}}>
            <BulbOutlined /> News
          </Link>
        {!user&&<><Link to='/signup' className='nav-btn-primary' onClick={closeMenu}>Sign Up</Link>
        <Link to='/signin' className='nav-btn-secondary' onClick={closeMenu}>Log In</Link></>}
        {user&&<Link to='/' className='nav-btn-tertiary' onClick={closeMenu}>Log Out</Link>}
        </nav>
      </div>
    </>
  );
};

export default Navbar;