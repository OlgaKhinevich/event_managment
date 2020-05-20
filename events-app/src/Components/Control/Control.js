import React from 'react';
import Event from '../Event/Event';
import socket from "../../connection"; 

class Control extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      events: [],
      steps: []    
    };
  }

  componentDidMount(){
    this.getEventInfo();
  }

  getEventInfo = () => {
    socket.once("$getEventInfo", (eventsInfo)=>{
      try {
          if(!eventsInfo) throw new Error("Ошибка во время получения информации о мероприятии!");
          for (let i=0; i<eventsInfo.length;i++) {
            eventsInfo[i].date = this.changeDate(eventsInfo[i].date);
          }
          this.setState(
            this.state.events = eventsInfo
          )
      }
      catch(err) {
        console.log(err);
      }
    });
    socket.emit("getEventInfo");
  }

  getStepsInfo = (index) => {
    socket.once("$getStepsInfo", (stepsInfo)=>{
      try {
          if(!stepsInfo) throw new Error("Ошибка во время получения информации об этапах!");
          for (let i=0; i<stepsInfo.length;i++) {
            stepsInfo[i].stepId = i;
          }
          this.setState(
            this.state.steps = stepsInfo 
          )
      }
      catch(err) {
        console.log(err);
      }
    });
    socket.emit("getStepsInfo", {eventName: this.state.events[index].name, eventDate: this.state.events[index].date});
  }

  onStepsOpen = (index)=>{
    this.setState(this.state.events.map((event, i) => {
      if (i === index) {
        this.getStepsInfo(index);
        event.open = !event.open
      } else {
        event.open = false;
      }
      return event;
    }))
  }

  changeDate = (serverDateString) => {
    let serverDate = new Date(serverDateString);
    let day1 = serverDate.getDate();
    let day = this.addZeros(day1);
    let month1 = serverDate.getMonth()+1;
    let month = this.addZeros(month1);
    let year = serverDate.getFullYear();
    let date = `${year}/${month}/${day}`;
    return date;  
  }

  addZeros = (number) => {
    if(number<10) {
        return "0" + number;
    }
    else {return number;}
  }

 doStep = (index) => {
    this.setState(this.state.steps.map((step, i) => {
      if (i === index) {
        step.isDone = !step.isDone
      } 
    }))
    this.changePercent(index);
  }

  changePercent = (stepIndex) => {
    let p = 100/this.state.steps.length; 
    if(this.state.steps[stepIndex].isDone) {
      this.setState(this.state.events.map((event) => {
        if (this.state.steps[stepIndex].eventName === event.name) {
          event.percent += p
          socket.emit("changePercent", {
            percent: event.percent,
            name: event.name
          });
        }
      })) 
    }
    socket.once("$changePercent", (status)=>{
        if(status) {
            alert("Процент подготовки успешно обновлен!");
            return;
        } alert("Ошибка при обновлении процента подготовки!");
    });
  }


  render() {
      const {events, steps} = this.state;
      return (
        <div className="control-content">
          <h2>Контроль подготовки к мероприятию</h2>
          {events.map((event, i) => 
            <Event 
            event={event} 
            steps={steps} 
            key={i} 
            onStepsOpen={this.onStepsOpen.bind(this, i)} 
            doStep={this.doStep} 
            />
          )}
        </div> 
      )
  }
}
  
export default Control;
  