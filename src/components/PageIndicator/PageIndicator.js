import React from "react";
import PageIndicatorButton from "../PageIndicatorButton/PageIndicatorButton";


class PageIndicator extends React.Component {
  
    renderIndicators = () => {
      let count = this.props.pageCount;
      let indicators = [];
      
      for(let i = 0; i < count; i++) {
        indicators.push(
          <PageIndicatorButton 
            active={i === this.props.activePage} 
            pageIndex={i}
            goToPage={this.props.goToPage}
            key={i}
          />
        );
      }
      
      return indicators;
    }
    
    render() {
      let pageIndicatorStyle = {
        ...this.props.style,
        height: '100vh',
        position: 'fixed',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      };
      
      return(
        <div style={pageIndicatorStyle}>
          {this.renderIndicators()}
        </div>
      );
    }
  }

  export default PageIndicator;
  