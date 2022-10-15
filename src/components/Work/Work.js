import { Component } from "react";
import { Link } from "react-router-dom";
import "./Work.scss";

class Work extends Component {
  render() {
    return (
      <>
        <div className="work-container ">
          <div className="row d-flex justify-content-center">
            <header className=" work-header">
              <h2>Here's all the stuff I do</h2>
              <p>Softwares and technologies i have multiple years experience at.</p>
            </header>
          </div>

          <div className="row d-flex justify-content-center">
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm col-xs-6  col-6">
              <section className="box style1">
                <span className="image-icon ">
                  <img src={require("../../images/Unity.png")} alt="" />
                </span>
                <h3 className="subject">Unity</h3>
                <p className="work-description">
                  Used unity game engine for {new Date().getFullYear() - 2017}+ years in different projects,
                  from games to simulations to mobile apps.
                </p>
              </section>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm col-xs-6 col-6">
              <section className="box style1">
                <span className="image-icon ">
                  <img src={require("../../images/Unreal.png")} alt="" />
                </span>
                <h3 className="subject">Unreal</h3>
                <p className="work-description">
                  Experienced in unreal engine and capable of developing all kind of AAA games with it,
                  From battle royale games to FPS games to MMO games.
                </p>
              </section>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm col-xs-6  col-6">
              <section className="box style1">
                <span className="image-icon ">
                  <img src={require("../../images/Multiplayer.png")} alt="" />
                </span>
                <h3 className="subject">Multiplayer</h3>
                <span className="work-description">
                  Used different frameworks like Photon and Unet with unity to integrate multiplayer to different kind of games,
                  board games with turn based and Host migration multiplayer, and real-time strategy games.
                </span>
              </section>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm col-xs-6  col-6">
              <section className="box style1">
                <span className="image-icon ">
                  <img src={require("../../images/AR&VR.png")} alt="" />
                </span>
                <h3 className="subject">AR & VR</h3>
                <span className="work-description">
                  Developed all kind of AR apps and VR games, used vuforia marker AR to develop multiple mobile apps,
                  used SteamVR to develop multiple PC games and simulations.
                </span>
              </section>
            </div>
          </div>
          <footer className=" work-footer">
            <div className="scrolly">
              <a href="" className="btn btn-lg btn-primary">Featured Projects</a>
            </div>
          </footer>
        </div>
      </>
    );
  }
}
export default Work;
