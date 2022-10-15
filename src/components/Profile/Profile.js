import { Component } from "react";
import "./Profile.scss";
import Background from '../../images/Title-Frame.png';
import { Link } from "react-router-dom";
class Profile extends Component {


  render() {
    // let location = useLocation();
    return (
      <>
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-3 col-md-4 col-sm-6 profile-img">
              <span className="image fit">
                <img className="profile-image" src={require('../../images/ProfilePicture.jpg')} alt="pic" />
              </span>
            </div>
          </div>

          <div className="row d-flex justify-content-center " >
            <header className=" col-md-12 col-sm-12 col-lg-6" >
              <h1 className="profile-header">
                <strong>Hassan Nasser</strong>
              </h1>
              <div className="job-title" style={{ backgroundImage: "url(" + Background + ")" }}>
                <span>Senior Game Developer</span>
              </div>
            </header>
          </div>
          <div className="row d-flex justify-content-center ">
            <div className="title-profile col-md-10 col-sm-12 col-lg-10">
              <div className="intro">
                <p>
                  I am a game developer living in Cairo, Egypt.
                  I recived my B.Sc from faculty of Computers and Artificial Intelligence, Benha University.<br />
                  I have been working as a game developer for {new Date().getFullYear() - 2017}+ years.
                  I enjoy making games and particpate in everything related to games.
                </p>
              </div>
              <div className="scrolly">
                <a href="#work"  className="btn btn-lg btn-primary">Learn about what I do</a>
              </div>

            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Profile;
