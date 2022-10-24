import { Component } from "react";
import React from 'react';
import Page from "../Page/Page";
import PageIndicator from "../PageIndicator/PageIndicator";
import { Navigation } from "../Navigation/Navigation"
import "./PageScroller.scss";
import animatedScrollTo from '../../utils/animated-scroll-to';
import isMobileDevice from '../../utils/is-mobile';

let animSetTime = null;

const scrollMode = {
  FULL_PAGE: 'full-page',
  NORMAL: 'normal',
};

class PageScroller extends Component {

  static getChildrenCount = (children) => {
    const childrenArr = React.Children.toArray(children);
    const slides = childrenArr.filter(({ type }) => type === Page);
    return slides.length;
  }

  constructor(props) {
    super(props);

    this.state = {
      scrollPos: 0,
      pageIndex: 0,
      scrollAgain: true,
      y: window.scrollY,
      activeSlide: 0,
      slidesCount: 5,
      initialSlide: 0
    };

    this.pages = 0;
    this.scrollLocker = () => { };
    this._isScrollPending = false;
    this._isScrolledAlready = false;
    this._slides = [];
    this._touchSensitivity = 5;
    this._touchStart = 0;
    this._isMobile = null;
  }

  componentDidMount = () => {
    this._isMobile = isMobileDevice();
    console.log(this._isMobile);
    if (this._isMobile) {
      document.addEventListener('touchmove', this.onTouchMove, { passive: false });
      document.addEventListener('touchstart', this.onTouchStart);
    } else {
      document.addEventListener('wheel', this.onScroll, { passive: false });
    }
    window.addEventListener('resize', this.onResize);

    this.onResize();
    this.scrollToSlide(this.state.initialSlide);
  }

  componentDidUpdate() {
    const newSlidesCount = PageScroller.getChildrenCount(this.props.children);
    if (newSlidesCount !== this.state.slidesCount) {
      this.setState({
        slidesCount: newSlidesCount,
      }, this.updateSlides);

      const slidesDiff = this.state.slidesCount - newSlidesCount;

      if (slidesDiff > 0 && this.state.activeSlide >= this.state.slidesCount - slidesDiff) {
        this.setState({
          activeSlide: newSlidesCount - 1,
        }, this.updateSlides);
      }
    }
  }

  componentWillUnmount() {
    if (this._isMobile) {
      document.removeEventListener('touchmove', this.onTouchMove);
      document.removeEventListener('touchstart', this.onTouchStart);
    } else {
      document.removeEventListener('wheel', this.onScroll);
    }
    window.removeEventListener('resize', this.onResize);
  }

  updateSlides = () => {
    this._slides = [];

    for (let i = 0; i < this.state.slidesCount; i++) {
      this._slides.push(window.innerHeight * i);
    }
  }
  onResize = () => {
    this.updateSlides();
    this.setState({
      height: window.innerHeight,
    });
  }

  onTouchStart = (evt) => {
    this._touchStart = evt.touches[0].clientY;
    this._isScrolledAlready = false;
  }

  onTouchMove = (evt) => {
    if (this.props.scrollMode !== scrollMode.FULL_PAGE) {
      return;
    }

    evt.preventDefault();
    const touchEnd = evt.changedTouches[0].clientY;

    if (!this._isScrollPending && !this._isScrolledAlready) {
      if (this._touchStart > touchEnd + this._touchSensitivity) {
        this.scrollToSlide(this.state.activeSlide + 1);
      } else if (this._touchStart < touchEnd - this._touchSensitivity) {
        this.scrollToSlide(this.state.activeSlide - 1);
      }
    }
  }
  onScroll = (evt) => {
    if (this.props.scrollMode !== scrollMode.FULL_PAGE) {
      return;
    }

    evt.preventDefault();
    if (this._isScrollPending) {
      return;
    }

    const scrollDown = (evt.wheelDelta || -evt.deltaY || -evt.detail) < 0;
    let { activeSlide } = this.state;
    
    if (scrollDown) {
      activeSlide++;
    } else {
      activeSlide--;
    }
    if (!this._isScrollPending)
      this.scrollToSlide(activeSlide);
  }

  // handleScroll = (e) => {
  //   let pageIndex = this.state.pageIndex;
  //   const winHeight = window.innerHeight;
  //   const windoww = e.currentTarget;
  //   if (this.state.scrollAgain) {
  //     if (pageIndex >= 0 && pageIndex <= this.pages - 1) {

  //       if (this.state.y >= windoww.scrollY) {
  //         console.log("scrolling up");
  //         // pageIndex--;
  //         // this.scroll(winHeight, pageIndex);

  //       } else if (this.state.y < windoww.scrollY) {
  //         console.log("scrolling down");
  //         // pageIndex++;
  //         // this.scroll(winHeight, pageIndex);

  //       }
  //     }
  //     console.log(pageIndex);
  //   }
  //   this.setState({ y: windoww.scrollY });
  // }

  scrollToSlide = (slide) => {
    if (slide >= 0 && slide < this.state.slidesCount) {
      this._isScrollPending = true;
      this.setState({
        activeSlide: slide,
      });

      animatedScrollTo(this._slides[slide], 1000, () => {
        this._isScrollPending = false;
        this._isScrolledAlready = true;
      });
    }
  }

  scroll = (pageIndex) => {
    // this.scrollToXY(2000, winHeight, pageIndex);
    this.scrollToSlide(pageIndex);
    // this.scrollLocker = setTimeout(() => {
    //   this.setState({ scrollAgain: true });
    // }, 1000);

    // this.setState({
    //   pageIndex: pageIndex,
    //   scrollAgain: false
    // });
  }
  ////////////////////////
  scrollToXY = (duration, winHeight, pageIndex) => {
    var start = winHeight * this.state.activeSlide;
    var end = winHeight * pageIndex;
    var distance = end - start;
    var target;
    var t = 0;
    var duration = 300;
    var increament = 3;
    var easeAnim = this.easeAnimation;
    const animateScroll = function () {
      //  target = start + (distance * t);
      target = easeAnim(t, start, distance, duration);
      t += increament;
      window.scrollTo(0, target);
      if (t <= duration)
        animSetTime = setTimeout(animateScroll, increament);

    }
    animateScroll();
    this.state.activeSlide = pageIndex;
  }
  //t = current time
  //b = start value
  //c = change in value
  //d = duration
  easeAnimation = (t, b, c, d) => {
    return c * t / d + b
  }

  goToPage = (index) => {
    if (animSetTime !== null)
      clearTimeout(animSetTime);
    this.scroll(index);
  }

  renderChildren = () => {
    let childElements = [];
    let pageIndicator = undefined;
    let pageNav = undefined;
    let pageCount = 0;

    React.Children.map(this.props.children, (child, i) => {
      if (child.type === Page) {
        pageCount++;
        childElements.push(child);
      } else if (child.type === PageIndicator) {
        pageIndicator = child;
      }
      else if (child.type === Navigation) {
        pageNav = child;
      }
    });

    this.pages = pageCount;

    if (pageIndicator) {
      childElements.push(
        React.cloneElement(pageIndicator, {
          pageCount: this.pages,
          activePage: this.state.activeSlide,
          goToPage: this.goToPage
        }));
    }

    if (pageNav) {
      childElements.push(
        React.cloneElement(pageNav, {
          activePage: this.state.activeSlide,
          goToPage: this.goToPage
        }));
    }

    return childElements;
  }

  render() {
    return (
      <div style={{ height: this.state.height }}>
        {this.renderChildren()}
      </div>
    );
  }
}
export default PageScroller;