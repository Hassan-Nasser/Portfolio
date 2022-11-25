import { Component } from "react";
import "./Portfolio.scss";
import Modal from "../Modal/Modal";
import Project from "../Project/Project";
import { db } from "../../config/firebase";
import { collection, getDocs } from 'firebase/firestore/lite';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'bootstrap/dist/css/bootstrap.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
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
      active: 0,
      currentTagIndex: -1
    };
  }

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
    this.setState({ projects: projectList, projectswithTag: projectList });
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
    const projects = await firebase.firestore().collection('projects').where('tags', 'array-contains', tagRef).get();
    const projectListwithTag = projects.docs.map(doc => doc.data());
    this.setState({ projectswithTag: projectListwithTag }, () => {
      this.state.swiper.updateSlides();
      this.state.swiper.slideReset();
      this.state.swiper.slideNext();
      this.state.swiper.update();
    });

  }

  setShow = (currentProject) => {
    this.setState({ isModalOpen: true });
    this.setState({ currentProject });
  };
  closeModal = () => {
    this.setState({ isModalOpen: false });
  }
  onSlideClick = (tagId, index) => {

    this.setState({ currentTagIndex: index, });
    if (tagId !== -1)
      this.getProjectsWithTag(tagId);
    else
      this.setState({ projectswithTag: this.state.projects }, () => {
        this.state.swiper.updateSlides();
        this.state.swiper.slideReset();
        this.state.swiper.slideNext();
        this.state.swiper.update();
      });

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

          <Swiper
            breakpoints={{
              300: {
                slidesPerView: 3,
                spaceBetween: 10
              },
              // when window width is >= 640px
              640: {
                slidesPerView: 6,
                spaceBetween: 10
              }
            }}
            navigation={{ clickable: true }}
            modules={[Navigation]}
            loop={true}
            className="tag-swipper"
          >
            <SwiperSlide
              onClick={() => this.onSlideClick(-1, -1)}
              style={{ backgroundColor: this.state.currentTagIndex === -1 && "blue" }}
              className="tag-filter prototype">All</SwiperSlide>
            {this.state.tags && this.state.tags.map((tag, i) =>
              <SwiperSlide
                style={{ backgroundColor: this.state.currentTagIndex === i && "blue" }}
                onClick={() => this.onSlideClick(tag.id, i)} className="tag-filter prototype" key={tag.id}>
                {tag.name}
              </SwiperSlide>)}
          </Swiper>

          <Swiper
            watchOverflow={false}
            centeredSlides={true}
            roundLengths={true}
            centeredSlidesBounds={true}
            observer={true}
            onSwiper={(swiper) => { this.setState({ swiper, active: 0 }) }}
            onSlideChange={() => {
              if (this.state.swiper) {
                this.setState({ active: this.state.swiper.realIndex })
              }
            }}
            // slidesPerView={3}
            pagination={{
              clickable: true,
            }}
            navigation={{ clickable: true }}
            modules={[Navigation]}
            loop={true}
            breakpoints={{

              300: {
                slidesPerView: 1, centeredSlides: true,
                spaceBetween: 5,
                initialSlide: 1

              },
              // when window width is >= 640px
              600: {
                initialSlide: 3,
                slidesPerView: 3,
                centeredSlides: true,
                spaceBetween: 5
              }
            }}
          >
            {
              this.state.projectswithTag && this.state.projectswithTag.map((project, i) => (

                <SwiperSlide
                  key={i}
                  virtualIndex={i}
                  style={{
                    '--active': i === this.state.active ? 1 : 0,
                    'pointerEvents': this.state.active === i ? 'auto' : 'none',
                    'opacity': i === this.state.active ? '1' : '0.6',
                    'transform': i === this.state.active ? 'scale(1)' : 'scale(0.7)',
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
