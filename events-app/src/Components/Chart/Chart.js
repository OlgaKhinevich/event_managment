import React from 'react';

class Chart extends React.Component {
    render() {
      return (
        <div className="chart-container">
          <div class = "svg"></div>
          <div id = "tag"></div>
        </div> 
      );
    }
  }

export default Chart;

