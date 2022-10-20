import React from "react";
import { Navigation } from "./components/Navigation/Navigation";
import PageScroller from "./components/PageScroller/PageScroller";
import PageIndicator from "./components/PageIndicator/PageIndicator";
import Profile from "./components/Profile/Profile";
import Work from "./components/Work/Work";
import Highlight from "./components/Highlight/Highlight";
import Portfolio from "./components/Portfolio/Portfolio";
import Page from "./components/Page/Page";
import Contact from "./components/Contact/Contact";
import "./GlobalStyles.scss";
import "./App.css";


class App extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {

    return (
      <PageScroller scrollMode='full-page' style={{ display: 'flex', flexDirection: 'column' }}>
        <Navigation />
        <PageIndicator />
        <Page className='page p0'
          style={{ backgroundColor: '#272BB0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          nav-title={'Num 1'}>
          <Profile />
        </Page>
        <Page className='page p1' style={{ backgroundColor: '#5727B0', display: 'flex', alignItems: 'center', justifyContent: 'center' }} nav-title={'Num 2'}>
          <Work />
        </Page>
        <Page className="p2" style={{ backgroundColor: '#57ACDC', display: 'flex', alignItems: 'center', justifyContent: 'center' }} nav-title={'Num 3'}>
          <Highlight />
        </Page>
        <Page className="p3" style={{ backgroundColor: '#57DCBE', display: 'flex', alignItems: 'center', justifyContent: 'center' }} nav-title={'Num 4'}>
          <Portfolio />
        </Page>
        <Page className="p4" style={{ backgroundColor: '#60C689', display: 'flex', alignItems: 'center', justifyContent: 'center' }} nav-title={'Num 5'}>
          <Contact />
        </Page>
      </PageScroller>
    );
  }

}


export default App;
