import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  StarOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  FundOutlined,
  EyeOutlined,
} from "assets/icons";
import { signout } from "store/slices/authSlice";
import { watchlistActions } from "store/slices/watchlistSlice";
import { ThemeToggle } from "components";
// import useVoiceAI from "../../helpers/customHook/useVoiceAI";
import icon from "assets/imgs/Cryptornado.png";

const Navbar = ({ isUserResolved }) => {
  //redux state management
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.authApi.currentUser);

  //router
  const history = useHistory();
  


  //state
  const [openSideNav, setOpenSideNav] = useState(undefined);
  const hamburgerMenu = openSideNav ? " open" : "";
  let showSideNav ;

  switch (openSideNav) {
    case undefined:
      showSideNav=''
      break;

      case true:
      showSideNav=' sideNav-open'
      break;

      case false:
      showSideNav=' sideNav-close'
      break;
  
    default:
      break;
  }

  //functions
  const closeMenu = () => setOpenSideNav(!openSideNav);

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
        className={` sideNav-coverage ${openSideNav? 'display-block':'display-none'}`}
      ></div>
      <div className="logo-container">
        <Link to="/">
          <img src={icon} />
        </Link>
        <Link to="/">
          <h3 className="text-logo">CrypTornado</h3>
        </Link>
      </div>
      <div className={`hamburger ${hamburgerMenu}`} onClick={closeMenu}>
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
          <StarOutlined /> Watchlist
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
              data-testid="sideNav-btn"
              className="sideNav-btn sideNav-btn-primary"
              onClick={closeMenu}
            >
              Sign Up
            </Link>
            <Link
              to="/signin"
              data-testid="sideNav-btn"
              className="sideNav-btn sideNav-btn-secondary"
              onClick={closeMenu}
            >
              Log In
            </Link>
          </>
        )}
        {currentUser && isUserResolved && (
          <Link
            to="/"
            data-testid="sideNav-btn"
            className="sideNav-btn sideNav-btn-tertiary"
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
