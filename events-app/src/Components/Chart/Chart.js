import React, { Component } from 'react';
import GanttChart from "react-google-charts";
import socket from "../../connection"; 

export default class Chart extends Component {

  constructor(props) {
    super(props);

    this.state = {
      events: []  
    };
  }

  componentDidMount(){
    this.getChartData();
  }

  getChartData = () => {
    socket.once("$getChartData", (chartInfo)=>{
      try {
          if(!chartInfo) throw new Error("Ошибка во время получения информации для графика!");
          this.setState(
            this.state.events = chartInfo
          )
      }
      catch(err) {
        console.log(err);
      }
    });
    socket.emit("getChartData");
  }

  render() {
    return (
      <div className="chart-content">
      <h2>График мероприятий</h2>
        <GanttChart
          width={'100%'}
          height={'400px'}
          events={this.state.events}
          chartType="Gantt"
          loader={<div>Loading Chart</div>}
          data={[
            [
              { type: 'string', label: 'Event Name' },
              { type: 'date', label: 'Start Date' },
              { type: 'date', label: 'End Date' },
              { type: 'number', label: 'Percent Complete' },
              { type: 'string', label: 'Dependencies' },
            ],

            

          ]}
          options={{
            height: 400,
            gantt: {
              trackHeight: 30,
            },
          }}
          rootProps={{ 'data-testid': '2' }}
        />
      </div>
    );
  }
}
