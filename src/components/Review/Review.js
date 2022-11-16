import React from "react";
import { useEffect, useState } from "react";
import "./Review.scss";
import 'react-multi-carousel/lib/styles.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { db } from "../../config/firebase";
import NoImage from '../../images/no-image.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft } from "@fortawesome/fontawesome-free-solid";


const storage = getStorage();

const mobilSlideWidth = 25;
const webSlideWidth = 40;

const CarouselSlideItem = ({ pos, idx, activeIdx, reviews }) => {
  const _items = reviews;

  const [width, setWidth] = useState(window.innerWidth);
  const [slideWidth, setSlideWidth] = useState(width <= 770 ? mobilSlideWidth : webSlideWidth);

  useEffect(() => {
    const handleWindowSizeChange = (e) => {
      setWidth(window.innerWidth);
      if (width <= 576) {
        setSlideWidth(mobilSlideWidth);
      } else {
        setSlideWidth(webSlideWidth);
      }

    }
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, [width, slideWidth]);



  const createItem = (position, idx) => {
    const item = {
      styles: {
        transform: `translateX(${position * slideWidth}rem)`,
      },
      review: _items[idx],
    };

    switch (position) {
      case Math.ceil(_items.length/2):
        break;
      default:
        item.styles = { ...item.styles, opacity: 0 };
        break;
    }

    return item;
  };
  const item = createItem(pos, idx, activeIdx);

  return (

    <li className="review-carousel__slide-item" style={item.styles} >
      <div className="image-review-cover">
        <img className="image-review" alt={item.review.name}
          src={item.review.url}
        />
        <span className="review-subject prototype white">{item.review.name}</span>
      </div>
      {/* <h3 className="subject prototype">{item.review.name}</h3> */}
    </li>
  );
};




const Review = () => {
  let keys = Array.from(Array(9).keys());
  const [items, setItems] = useState(keys);
  const [reviews, setReviews] = useState([]);
  const [isTicking, setIsTicking] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  let bigLength = items.length;
  useEffect(() => {

    firebase.firestore().collection('reviews').get().then(reviews => {
      const reviewList = reviews.docs.map(doc => doc.data());
      setReviews(reviewList);
    }).catch(err => console.log(err));

  }, [items]);

  const prevClick = (jump = 1) => {
    if (!isTicking) {
      setIsTicking(true);
      setItems((prev) => {
        return prev.map((_, i) => prev[(i + jump) % bigLength]);
      });
    }
  };

  const nextClick = (jump = 1) => {
    if (!isTicking) {
      setIsTicking(true);
      setItems((prev) => {
        return prev.map(
          (_, i) => prev[(i - jump + bigLength) % bigLength],
        );
      });
    }
  };

  const handleDotClick = (idx) => {
    if (idx < activeIdx) prevClick(activeIdx - idx);
    if (idx > activeIdx) nextClick(idx - activeIdx);
  };
  const sleep = (ms = 0) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  useEffect(() => {
    if (isTicking) sleep(300).then(() => setIsTicking(false));
  }, [isTicking]);

  useEffect(() => {
    setActiveIdx((bigLength - (items[0] % bigLength)) % bigLength)
  }, [items]);

  return (
    <div className="container">

      <div className=" d-flex justify-content-center">
        <header>
          <h4 className="prototype white">Client's Reviews</h4>
          <p className="font-5 montserrat custom-grey">Some of my freelance projects reviews, projects were done on upwork. </p>

        </header>
      </div>
      <div className="row d-flex justify-content-center">
        <div className="carousel__wrap">
          <div className="carousel__inner">

            <div className="carousel__container">
              <ul className="review-carousel__slide-list">
                {items.length > 0 && reviews.length > 0 && items.map((pos, i) => {

                  return (
                    <CarouselSlideItem
                      key={i}
                      idx={i}
                      pos={pos}
                      activeIdx={activeIdx}
                      reviews={reviews}
                    />
                  )
                })}
              </ul>
            </div>
            <FontAwesomeIcon
              onClick={() => prevClick()}
              className="carousel__btn carousel__btn--prev"
              icon={faChevronLeft} size="5x" />
            <FontAwesomeIcon
              onClick={() => nextClick()}
              className="carousel__btn carousel__btn--next"
              icon={faChevronRight} size="5x" />
            <div className="carousel__dots">
              {items.slice(0, reviews.length).map((pos, i) => (
                <button
                  key={i}
                  onClick={() => handleDotClick(i)}
                  className={i === activeIdx ? 'dot active' : 'dot'}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>

  );
};
export default Review;
