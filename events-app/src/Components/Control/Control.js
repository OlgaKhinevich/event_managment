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

  // получение данных о мероприятиях
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

  // получения данных об этапах
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

  // открытие мероприятия
  onStepsOpen = (index)=>{
    this.getStepsInfo(index);
    this.setState(this.state.events.map((event, i) => {
      if (i === index) {
        event.open = !event.open
      } 
      return event;
    }))
  }

  // преобразование даты
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

  // добавление нулей к дате
  addZeros = (number) => {
    if(number<10) {
        return "0" + number;
    }
    else {return number;}
  }

 // выполнение этапа подготовки
 doStep = (index) => {
  socket.once("$doStep", (status)=>{
    if(status) {
        return;
    } alert("Ошибка при изменении этапа!");
  });
  this.setState(this.state.steps.map((step, i) => {
      if (i === index) {
        if(step.isDone == 1) {
          step.isDone = 0;
        }
        else if(step.isDone == 0) {
          step.isDone = 1;
        }
      } 
      socket.emit("doStep", {
        isDone: step.isDone,
        stepName: step.stepName
      });    
  }))   
  console.log(this.state.steps); 
  this.changePercent(index);
}

// изменение процента подготовки
changePercent = (stepIndex) => {
  let p = 100/this.state.steps.length; 
  socket.once("$changePercent", (status)=>{
    if(status) {
      return;
    } alert("Ошибка при обновлении процента подготовки!");
  });
   
  this.setState(this.state.events.map((event) => {
    if (this.state.steps[stepIndex].isDone && this.state.steps[stepIndex].eventName === event.name) {
      event.percent = event.percent + p;
      socket.emit("changePercent", {
        percent: event.percent,
        name: event.name,
        date: event.date
      });
    }
    if (!this.state.steps[stepIndex].isDone && this.state.steps[stepIndex].eventName === event.name) {
      event.percent = event.percent - p;
      socket.emit("changePercent", {
        percent: event.percent,
        name: event.name,
        date: event.date
      });
    }
    
  })) 
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
  