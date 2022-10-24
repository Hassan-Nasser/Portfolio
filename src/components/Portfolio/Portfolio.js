import { Component } from "react";
import "./Portfolio.scss";
import Modal from "../Modal/Modal";
import { Scrollbars } from "react-custom-scrollbars";
import Tag from "../Tag/Tag";
import Carousel from "../Carousel/Carousel";
import Project from "../Project/Project";
import { db } from "../../config/firebase";
import { collection, getDocs } from 'firebase/firestore/lite';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'bootstrap/dist/css/bootstrap.css';

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
      isLoaded: false,
      isModalOpen: false
    };
  }

  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };

  componentDidMount() {
    this.getProjects();
    this.getTags(db);
    this.setState({ isLoaded: true });
  }
  componentWillUnmount() {
    this.setState({ isLoaded: false });
  }

  getProjects = async () => {
    const projects = await firebase.firestore().collection('projects').orderBy("order").get();
    const projectList = projects.docs.map(doc => doc.data());
    this.setState({ projects: projectList });
  }
  getTags = async (db) => {
    const tags = collection(db, 'tags');
    const tagSnapshot = await getDocs(tags);
    const tagList = tagSnapshot.docs.map(doc => {
      const data = {};
      data.name = doc.data().name;
      data.id = doc.id
      return data;
    });
    this.setState({ tags: tagList });
  }

  getProjectsWithTag = async (tagId) => {
    const tagRef = firebase.firestore().collection('tags').doc(tagId);
    const projects = await firebase.firestore().collection('projects').where('tags', 'array-contains', tagRef).orderBy("order").get();
    const projectListwithTag = projects.docs.map(doc => doc.data());
    this.setState({ projectswithTag: projectListwithTag });

  }
  onSelectTap = (event) => {
    this.getProjectsWithTag(event)
  }

  setShow = (flag, currentProject = "") => {
    this.setState({ isModalOpen: flag });
    console.log("flag = ", flag);
    // if (flag) {
    //   this.setState({ currentProject });
    // }
  };
  toggleModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }

  render() {
    if (!this.state.isLoaded) {
      return null; 
    }
    return (
      <div className="container">
        <div className="row d-flex justify-content-center">
          <header className=" dosis">
            <h2>My Recent Work</h2>
            <p>
              Here are a few projects I've worked on recently. Want to see more?{" "}
              <a href="#contact">Email me</a>.
            </p>
          </header>
        </div>

        <div className="row d-flex justify-content-center">
          {this.state.isModalOpen && <Modal onRequestClose={() => this.toggleModal()} />}
          {/* <Tabs
              defaultActiveKey="0"
              id="uncontrolled-tab-example"
              className="mb-3"
              onSelect={(e) => this.onSelectTap(e)}
              justify
            >

              <Tab eventKey="0" title="All">
                <Carousel
                  ssr={false}
                  infinite
                  swipeable
                  draggable={false}
                  ref={el => (this.Carousel = el)}
                  partialVisbile={false}
                  itemClass="slider-image-item"
                  responsive={responsive}
                  containerClass="carousel-container-with-scrollbar"
                  autoPlay={false}
                  shouldResetAutoplay={false}
                >
                  {this.state.projects && this.state.projects.map((project) =>
                    <Project
                      key={project.name}
                      tagsExist={true}
                      project={project}
                      headerPosition="normal-header-position"
                      showModal={() => this.setShow(true, project)} />
                  )}
                </Carousel>
              </Tab>
              {this.state.tags && this.state.tags.map(tag =>

                <Tab key={tag.id} eventKey={tag.id} title={tag.name}>
                  <Carousel
                    ssr={false}
                    infinite
                    swipeable
                    draggable={false}
                    ref={el => (this.Carousel = el)}
                    partialVisbile={false}
                    itemClass="slider-image-item"
                    responsive={responsive}
                    containerClass="carousel-container-with-scrollbar"
                    autoPlay={false}
                    shouldResetAutoplay={false}
                  >
                    {this.state.projectswithTag && this.state.projectswithTag.map((project) =>
                      <Project
                        key={project.name}
                        tagsExist={true}
                        project={project}
                        headerPosition="normal-header-position"
                        showModal={() => this.setShow(true, project)} />
                    )}
                  </Carousel>
                </Tab>

              )}
            </Tabs> */}
          <Carousel>
            {
              this.state.projects && this.state.projects.map((project, i) => (
                <div className="card" key={i}>
                  <Project
                    key={project.name}
                    tagsExist={true}
                    project={project}
                    headerPosition="normal-header-position"
                    showModal={() => this.setShow(true, project)} />
                </div>
              ))}
          </Carousel>
        </div>

      </div>
    );
  }
}
export default Portfolio;
