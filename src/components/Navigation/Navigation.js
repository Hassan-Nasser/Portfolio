import React from "react";
import { pages } from "../../data";
import "./Navigation.scss";
import 'bootstrap/dist/css/bootstrap.min.css';

export function Navigation(props) {


  return (
    <div className="prototype">
      <a id="logo" className="font-3" href="#" >Hassan Nasser</a>
      <ul id="menu" className="font-2">
        {pages.map((page, index) => (
          <li className={props.activePage === index ? "active" : ""} key={index}
            onClick={() => { props.goToPage(page.pageNumber) }}
            data-menuanchor={page.title}>
            <a className="link font-2">
              {page.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

