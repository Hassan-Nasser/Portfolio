import { Component } from "react";
import "./Highlight.scss";
import Modal from "react-bootstrap/Modal";
import { Scrollbars } from "react-custom-scrollbars";
import Tag from "../Tag/Tag";
import 'react-multi-carousel/lib/styles.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'bootstrap/dist/css/bootstrap.css';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { Link } from "react-router-dom";


const storage = getStorage();
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};
const lazyLoadList = [
  {
    original: require("../../images/grey.png"),
    thumbnail: require("../../images/grey.png"),
  },
  {
    original: require("../../images/grey.png"),
    thumbnail: require("../../images/grey.png"),
  },
  {
    original: require("../../images/grey.png"),
    thumbnail: require("../../images/grey.png"),
  },
];

class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      currentProject: "",
      projectswithTag: [],
      projects: [],
      tags: [],
      projectImage: "",
      value: 0,
      projectsCover: [{
        original: require("../../images/grey.png"),
        thumbnail: require("../../images/grey.png"),
      },
      {
        original: require("../../images/grey.png"),
        thumbnail: require("../../images/grey.png"),
      }]
    };
  }


  componentDidMount() {
    this.getProjects();
  }


  getProjects = async () => {
    const projects = await firebase.firestore().collection('projects').where("spotlight", "==", true).get();
    const projectList = projects.docs.map(doc => doc.data());
    this.setState({ projectsCover: [] })
    projectList.forEach(project => {
      getDownloadURL(ref(storage, `${project.name}.jpg`))
        .then((data) => {
          var joined = this.state.projectsCover.concat(
            { original: data, thumbnail: data, originalAlt: project.name }
          );
          this.setState({ projectsCover: joined })
        }).catch(err => console.log(err));
    });
    this.setState({ projects: projectList });

  }

  setShow = (flag, currentProject = "") => {
    this.setState({ show: flag });
    if (flag) {
      this.setState({ currentProject });
    }
  };
  showModal = (e) => {
    let selectedProject = {};
    selectedProject = this.getSelectedProject(e.target.alt);
    this.setShow(true, selectedProject);
  }
  getSelectedProject = (projectName) => {
    let pp = {};
    this.state.projects.forEach(p => {
      if (p.name === projectName) {
        pp = p;
        return;
      }
    })
    return pp;
  }


  render() {
    return (
      <>
        <div className="container">
          <div className=" d-flex justify-content-center">
            <header>
              <h2>Career Highlight</h2>
              <p>
                These are some of the biggest projects I worked on.
              </p>
            </header>
          </div>

          <div className="container-fluid slider">
            {/* {this.state.projectsCover ( */}
            <ImageGallery items={this.state.projectsCover}
              thumbnailPosition="bottom"
              showFullscreenButton={false}
              showPlayButton={false}
              showBullets={true}
              lazyLoad={true}
              onClick={(e) => this.showModal(e)}
            />

          </div>

          <footer>
            <div className="scrolly">
              <Link to="/portfolio" className="btn btn-lg btn-primary">My Recent Work</Link>
            </div>
          </footer>
          <Modal
            size="xl"
            show={this.state.show}
            onHide={() => this.setShow(false)}
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title"
            className="Modal-Style"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-custom-modal-styling-title">
                {this.state.header}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="video image featured">
                <iframe
                  title="myFrame"
                  src={this.state.currentProject.url}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <Tag className="tag" tags={this.state.currentProject.tags} />
              <Scrollbars
                style={{ height: 100 }}
              // autoHide
              >
                <p className="description">{this.state.currentProject.description}</p>

              </Scrollbars>

            </Modal.Body>
          </Modal>
        </div>
      </>
    );
  }
}
export default Portfolio;
