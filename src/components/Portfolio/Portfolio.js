import { Component } from "react";
import "./Portfolio.scss";
import Modal from "../Modal/Modal";
import Tag from "../Tag/Tag";
import Carousel from "../Carousel/Carousel";
import Project from "../Project/Project";
import { db } from "../../config/firebase";
import { collection, getDocs } from 'firebase/firestore/lite';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'bootstrap/dist/css/bootstrap.css';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


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
      isModalOpen: false,
      swiper: null,
      active: 0
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

  setShow = (currentProject) => {
    this.setState({ isModalOpen: true });
    this.setState({ currentProject });
  };
  closeModal = () => {
    this.setState({ isModalOpen: false });
  }

  render() {
    if (!this.state.isLoaded) {
      return null;
    }
    return (
      <div className="container">
        <div className="row d-flex justify-content-center">
          <header>
            <h2 className="prototype white" >Some of my work</h2>
            <p className="montserrat custom-grey">
              Here are a few projects I've worked on recently. Want to see more?{" "}
              {/* <div className="pointer"  >Email me</div>. */}
            </p>
          </header>
        </div>

        <div className="row d-flex justify-content-center">
          {this.state.isModalOpen &&
            <Modal project={this.state.currentProject} closeModal={() => this.closeModal()} />
          }
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
          {/* <Carousel>
            {
              this.state.projects && this.state.projects.map((project, i) => (
                <div className="card" key={i}>
                  <Project
                    key={project.name}
                    tagsExist={true}
                    project={project}
                    headerPosition="normal-header-position"
                    showModal={() => { this.setShow(project) }} />
                </div>
              ))}
          </Carousel> */}

          <Swiper
            initialSlide={3}
            centeredSlides={true}
            onSwiper={(swiper) => { this.setState({ swiper, active: 0 }) }}
            onSlideChange={() => {
              if (this.state.swiper) {
                this.setState({ active: this.state.swiper.realIndex  })
              }
            }}
            slidesPerView={3}
            // spaceBetween={-30}
            pagination={{
              clickable: true,
            }}
            navigation={{ clickable: true }}
            modules={[Navigation]}
            loop={true}
            breakpoints={{
             
              300: {
                slidesPerView: 1,
                spaceBetween: 10
              },
              // when window width is >= 640px
              640: {
                slidesPerView: 3,
                spaceBetween: 10
              }
            }}
          >
            {
              this.state.projects && this.state.projects.map((project, i) => (
                <SwiperSlide
                  key={i}
                  style={{
                    // width: i == this.state.active ? "95%" : "20%" ,
                    height: i == this.state.active ? "90%" : "90%",

                    '--active': i === this.state.active ? 1 : 0,
                    '--offset': (this.state.active - i) / 3.2,
                    '--direction': Math.sign(this.state.active - i),
                    '--abs-offset': Math.abs(this.state.active - i) / 2,
                    'pointerEvents': this.state.active === i ? 'auto' : 'none',
                    'opacity': i == this.state.active ? '1' : '0.6',
                  }}
                >

                  <div className="card" >
                    <Project
                      key={project.name}
                      tagsExist={true}
                      project={project}
                      headerPosition="normal-header-position"
                      showModal={() => { this.setShow(project) }} />
                  </div>

                </SwiperSlide>
              ))}
          </Swiper>
        </div>

      </div>
    );
  }
}
export default Portfolio;
