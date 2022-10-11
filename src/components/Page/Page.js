import React from "react";
import Profile from "../Profile/Profile";
import Work from "../Work/Work";
import Highlight from "../Highlight/Highlight";
import Portfolio from "../Portfolio/Portfolio";
import Contact from "../Contact/Contact";
import "./Page.scss";

export function Page({ page, ...rest }) {
    return (
        <div className="wrapper2" style={{ backgroundColor: page.color }}>
            <div className="page-container">
                {page.pageNumber === 1 && (
                    <Profile />
                )}
                {page.pageNumber === 2 && (
                    <Work />
                )}
                {page.pageNumber === 3 && (
                    <Highlight />
                )}
                {page.pageNumber === 4 && (
                    <Portfolio />
                )}
                {page.pageNumber === 5 && (
                    <Contact />
                )}
                {/* <Form /> */}
            </div>
        </div>
    );
}
