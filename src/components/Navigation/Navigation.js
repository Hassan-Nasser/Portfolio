import React from "react";
import { useContext } from "react";
import { pages } from "../../data";
import "./Navigation.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faBars, faGamepad } from '@fortawesome/fontawesome-free-solid';
import AppContext from "../AppContext";

export function Navigation(props) {
  const [click, setClick] = React.useState(false);
  const { setIsNav } = useContext(AppContext);
  const handleClick = () => {
    setClick(!click);
    // if (click) setIsNav(false);
    // else setIsNav(true);
  };
  const Close = () => setClick(false);

  return (
    <div className="prototype">
      <div className={click ? "main-container" : ""} onClick={() => Close()} />
      <nav className="navbar fixed-top" onClick={e => e.stopPropagation()}>
        <div className="nav-container">
          <a className=" font-3 nav-logo" onClick={() => { props.goToPage(0) }}>
            Hassan Nasser   <FontAwesomeIcon icon={faGamepad} />
          </a>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            {pages.map((page, index) => (
              <li className={props.activePage === index ? "nav-item active" : "nav-item"} key={index}
                onClick={() => { handleClick(); props.goToPage(page.pageNumber); }}
                data-menuanchor={page.title}>
                <a className="font-2 nav-links">
                  {page.title}
                </a>
              </li>

            ))}
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            {click ?
              <FontAwesomeIcon icon={faTimes} />
              : <FontAwesomeIcon icon={faBars} />}

          </div>
        </div>
      </nav>
    </ div>
  );
}

