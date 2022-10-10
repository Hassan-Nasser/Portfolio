import React from "react";
import { pages } from "../../data";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "./Navigation.scss";
import 'bootstrap/dist/css/bootstrap.min.css';

const NavLink = styled.a`
  border-radius: 8px;
  flex: none;
  font-weight: 500;
  padding: 6px 6px;
  text-decoration: none;
  transition: background-color 200ms ease;

  &:hover {
    background-color: rgba(47, 66, 80, 0.2);
    text-decoration: none;
  }
`;

export function Navigation(props) {
  return (
    <div {...props}>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        {pages.map((page, index) => (
          <NavLink as={Link} key={index} to={page.path}>
            {page.title}
          </NavLink>
        ))}
      </nav>
    </div>
  );

}

