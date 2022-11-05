import { Component } from "react";
import "./Review.scss";
import 'react-multi-carousel/lib/styles.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { db } from "../../config/firebase";
import AppContext from "../AppContext";
import NoImage from '../../images/no-image.png';

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

class Review extends Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      currentProject: "",
      projectswithTag: [],
      reviews: [],
      tags: [],
      projectImage: "",
      value: 0,
      isModalOpen: false,
      allReviews: [{
        original: require("../../images/grey.png"),
        thumbnail: require("../../images/grey.png"),
        description: "HELLO"
      },
      {
        original: require("../../images/grey.png"),
        thumbnail: require("../../images/grey.png"),
        description: "HELLO2"
      }]
    };
  }
  componentDidMount() {
    this.getReviews();

  }


  getReviews = async () => {
    const reviews = await firebase.firestore().collection('reviews').get();
    const reviewList = reviews.docs.map(doc => doc.data());
    this.setState({ allReviews: [] });
    reviewList.forEach(review => {
      getDownloadURL(ref(storage, `Reviews/${review.number}.png`))
        .then((data) => {
          var joined = this.state.allReviews.concat(
            { original: data, thumbnail: data, description: review.name }
          );
          this.setState({ allReviews: joined })
        }).catch(err => {
          var joined = this.state.allReviews.concat(
            { original: NoImage, thumbnail: NoImage, originalAlt: review.name }
          );
          this.setState({ allReviews: joined })
          console.log(err)
        });
    })
  }

  render() {

    return (

      <div className="container">
        <div className=" d-flex justify-content-center lora">
          <header>
            <h4>Some of client reviews</h4>
          </header>
        </div>

        <div className="container-fluid review-slider">
          <ImageGallery
            className="image-gallery"
            items={this.state.allReviews}
            thumbnailPosition="bottom"
            showThumbnails={false}
            showPlayButton={true}
            showBullets={false}
            lazyLoad={true}
            infinite={true}
            autoPlay={true}
          />
        </div>
      </div>
    );
  }
}
export default Review;
