import React from "react";
import { pages } from "../../data";
import "./Navigation.scss";
import 'bootstrap/dist/css/bootstrap.min.css';

export function Navigation(props) {
return (
    <div>

      <a id="logo" href="/" >Hassan Nasser</a>
      <ul id="menu">
        {pages.map((page, index) => (
          <li className={props.activePage === index ? "active" : ""} key={index}
            onClick={() => { props.goToPage(page.pageNumber) }}
            data-menuanchor={page.title}>
            <a className="link">
              {page.title}
            </a>
          </li>

        ))}
      </ul>
    </div>
  );
}

