import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  FundOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { signout } from "store/slices/authSlice";
import { watchlistActions } from "store/slices/watchlistSlice";
import { ThemeToggle } from "mainLayer/index";
import icon from "assets/imgs/Cryptornado.png";

const Navbar = ({ isUserResolved }) => {
  //redux state management
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.authApi.currentUser);

  //router
  const history = useHistory();

  //state
  const [isSideNavOpen, setSideNavOpen] = useState(false);
  const hamburgerMenu = isSideNavOpen ? "hamburger open" : "hamburger";
  const showSideNav = isSideNavOpen ? " sideNav-open" : "";

  //functions
  const closeMenu = () => setSideNavOpen(!isSideNavOpen);

  const onSignout = async () => {
    await dispatch(signout());
    dispatch(watchlistActions.setWatchlist({ favCryptos: [] }));
    history.push("/");
    closeMenu();
  };

  return (
    <div className="nav">
      <div
        onClick={closeMenu}
        style={{
          display: isSideNavOpen ? "block" : "none",
          position: "absolute",
          top: "0",
          right: "200px",
          left: "0",
          height: "100vh",
        }}
      ></div>
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
      <nav className={`sideNav ${showSideNav}`}>
        <ThemeToggle closeMenu={closeMenu} />
        <Link
          to="/watchlist"
          onClick={closeMenu}
          data-testid="sideNav-item"
          className="sideNav-item"
        >
          <HomeOutlined /> Watchlist
        </Link>
        <Link
          to="/"
          onClick={closeMenu}
          data-testid="sideNav-item"
          className="sideNav-item"
        >
          <EyeOutlined /> Glance
        </Link>
        <Link
          to="/cryptocurrencies"
          onClick={closeMenu}
          data-testid="sideNav-item"
          className="sideNav-item"
        >
          <FundOutlined /> Cryptocurrencies
        </Link>
        <Link
          to="/exchanges"
          onClick={closeMenu}
          data-testid="sideNav-item"
          className="sideNav-item"
        >
          <MoneyCollectOutlined /> Exchanges
        </Link>
        <Link
          to="/news"
          onClick={closeMenu}
          data-testid="sideNav-item"
          className="sideNav-item"
          style={{ marginBottom: "2rem" }}
        >
          <BulbOutlined /> News
        </Link>
        {!currentUser && isUserResolved && (
          <>
            <Link
              to="/signup"
              data-testid="nav-btn"
              className="nav-btn-primary"
              onClick={closeMenu}
            >
              Sign Up
            </Link>
            <Link
              to="/signin"
              data-testid="nav-btn"
              className="nav-btn-secondary"
              onClick={closeMenu}
            >
              Log In
            </Link>
          </>
        )}
        {currentUser && isUserResolved && (
          <Link
            to="/"
            data-testid="nav-btn"
            className="nav-btn-tertiary"
            onClick={onSignout}
          >
            Log Out
          </Link>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
