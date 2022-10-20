import { Component } from "react";
import "./Profile.scss";
import Background from '../../images/Title-Frame.png';


class Profile extends Component {
  render() {
    return (
      <div className="container" >
        <div className="row d-flex justify-content-center">
          <div className="col-lg-3 col-md-4 col-sm-6 profile-img">
            <span className="image fit">
              <img className="profile-image" src={require('../../images/ProfilePicture.jpg')} alt="pic" />
            </span>
          </div>
        </div>

        <div className="row d-flex justify-content-center " >
          <header className=" col-md-12 col-sm-12 col-lg-6" >
            <h1 className="profile-header ">
              <strong className="font-1 prototype">Hassan Nasser</strong>
            </h1>
            <div className="job-title" style={{ backgroundImage: "url(" + Background + ")" }}>
              <span className="font-2 satisfy white">Senior Game Developer</span>
            </div>
          </header>
        </div>
        <div className="row d-flex justify-content-center ">
          <div className="title-profile col-md-10 col-sm-12 col-lg-10">
            <div className="intro">
              <p className="montserrat font-4">
                I am a game developer living in Cairo, Egypt.
                I recived my B.Sc from faculty of Computers and Artificial Intelligence, Benha University.<br />
                I have been working as a game developer for {new Date().getFullYear() - 2017}+ years.
                I enjoy making games and particpate in everything related to games.
              </p>
            </div>

          </div>
        </div>
      </div>
    );
  }
}
export default Profile;
