import { Component } from "react";
import React from 'react';
import Page from "../Page/Page";
import PageIndicator from "../PageIndicator/PageIndicator";
import { Navigation } from "../Navigation/Navigation"
import "./PageScroller.scss";


class PageScroller extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollPos: 0,
      pageIndex: 0,
      scrollAgain: true,
      y: window.scrollY
    };

    this.pages = 0;
    this.scrollLocker = () => { };
    this.currentIndex = 0;


  }

  componentDidMount = () => {
    window.addEventListener('scroll', (e) => this.handleScroll(e));
  }

  componentWillUnmount = () => {
    window.removeEventListener('scroll', (e) => this.handleScroll(e));
  }

  handleScroll = (e) => {
    let pageIndex = this.state.pageIndex;
    const winHeight = window.innerHeight;
    const windoww = e.currentTarget;
    if (this.state.scrollAgain) {
      if (pageIndex >= 0 && pageIndex <= this.pages - 1) {
       
        if (this.state.y >= windoww.scrollY) {
          console.log("scrolling up");
          pageIndex--;
          this.scroll(winHeight, pageIndex);

        } else if (this.state.y < windoww.scrollY) {
          console.log("scrolling down");
          pageIndex++;
          this.scroll(winHeight, pageIndex);

        }
      }
      console.log(pageIndex);
    }
    this.setState({ y: windoww.scrollY });
  }

  scroll = (winHeight, pageIndex) => {
    this.scrollToXY(2000, winHeight, pageIndex);
    this.scrollLocker = setTimeout(() => {
      this.setState({ scrollAgain: true });
    }, 1000);

    this.setState({
      pageIndex: pageIndex,
      scrollAgain: false
    });
  }
  ////////////////////////
  scrollToXY = (duration, winHeight, pageIndex) => {
    var start = winHeight * this.currentIndex;
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
        setTimeout(animateScroll, increament);

    }
    animateScroll();
    this.currentIndex = pageIndex;
  }
  //t = current time
  //b = start value
  //c = change in value
  //d = duration
  easeAnimation = (t, b, c, d) => {
    return c * t / d + b
  }

  goToPage = (index) => {
    this.scroll(window.innerHeight, index);
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
          activePage: this.state.pageIndex,
          goToPage: this.goToPage
        }));
    }

    if (pageNav) {
      childElements.push(
        React.cloneElement(pageNav, {
          activePage: this.state.pageIndex,
          goToPage: this.goToPage
        }));
    }

    return childElements;
  }

  render() {
    return (
      <div {...this.props}>
        {this.renderChildren()}
      </div>
    );
  }
}
export default PageScroller;