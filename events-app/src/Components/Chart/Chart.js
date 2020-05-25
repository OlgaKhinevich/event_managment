import React, { Component } from 'react';
import GanttChart from "react-google-charts";
import socket from "../../connection"; 


export default class Chart extends Component {

  constructor(props) {
    super(props);

    this.state = {
      events:[]
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
            chartInfo[i].date = this.presentDate(chartInfo[i][2]);
            chartInfo[i].prepDate = this.presentDate(chartInfo[i][3]);
          }
     
          const mapResult = chartInfo.map((item, i)=>{
            return [item["id"] = i, item["name"], item["prepDate"], item["date"], item["percent"]];
          });

    
          this.setState({
            events: mapResult
          });
      }
      catch(err) {
        console.log(err);
      }
    });
    socket.emit("getChartData");
  }

  presentDate = (serverDateString) => {
    const [day, month, year] = serverDateString.split(".");
    return new Date(year, month, day);

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
      {<GanttChart
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

           
          ...this.state.events.map((event) => {
              let mass = [event[0], event[1], "Resource" ,event[2], event[3], null, event[4]||0, null];
              return mass;
            }) 

          ]}
          options={{
            height: 400,
            gantt: {
              trackHeight: 30,
            },
          }}
         
        />
  }
      </div>
      
    );
  }
}
