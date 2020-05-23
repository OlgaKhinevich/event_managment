import React, { Component } from 'react';
import GanttChart from "react-google-charts";
import socket from "../../connection"; 

export default class Chart extends Component {

  constructor(props) {
    super(props);

    this.state = {
      events: [
        '2014Spring',
      'Spring 2014',
      'spring',
      new Date(2014, 2, 22),
      new Date(2014, 5, 20),
      null,
      100,
      null,]  
    };
  }

  componentDidMount(){
    this.getChartData();
  }

  getChartData = () => {
    socket.once("$getChartData", (chartInfo)=>{
      try {
          if(!chartInfo) throw new Error("Ошибка во время получения информации для графика!");
          for (let i=0; i<chartInfo.length;i++) {
            chartInfo[i].date = this.presentDate(chartInfo[i].date);
            chartInfo[i].prepDate = this.presentDate(chartInfo[i].prepDate);
          }
          const mapResult = chartInfo.map((item, i)=>{
            return [item["id"] = i, item["name"], item["prepDate"], item["date"], item["percent"]];
            })
            this.setState({
            events: mapResult
            })
            console.log(this.state.events)
      }
      catch(err) {
        console.log(err);
      }
    });
    socket.emit("getChartData");
  }

  presentDate = (serverDateString) => {
    let serverDate = new Date(serverDateString);
    let day1 = serverDate.getDate();
    let day =  this.addZeros(day1);
    let month1 = serverDate.getMonth()+1;
    let month = this.addZeros(month1);
    let year = serverDate.getFullYear();
    let date = `${day}.${month}.${year}`;
    return date; 
  }

  addZeros = (number) => {
    if(number<10) {
        return "0" + number;
    }
    else {return number;}
  }

  
  render() {
    return (
      <div className="chart-content">
      <h2>График мероприятий</h2>
        <GanttChart
          width={'100%'}
          height={'400px'}
          chartType="Gantt"
          loader={<div>Loading Chart</div>}
          data={[
            [
              { type: 'string', label: 'Task ID' },
      { type: 'string', label: 'Task Name' },
      { type: 'string', label: 'Resource' },
      { type: 'date', label: 'Start Date' },
      { type: 'date', label: 'End Date' },
      { type: 'number', label: 'Duration' },
      { type: 'number', label: 'Percent Complete' },
      { type: 'string', label: 'Dependencies' },
    
            ],

           
         
           
           /*...this.state.events.map((event) => {
            let mass = [event[0], event[1], event[2], event[3], this.daysToMilliseconds(1), event[4], null];
            return mass;
            }) */

          ]}
          options={{
            height: 400,
            gantt: {
              trackHeight: 30,
            },
          }}
          //rootProps={{ 'data-testid': '2' }}
        />
      </div>
    );
  }
}
