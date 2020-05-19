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

  render() {
      const {events, steps} = this.state;
      return (
        <div className="control-content">
          <h2>Контроль подготовки к мероприятию</h2>
          {events.map((event, i) => 
            <Event event={event} steps={steps} key={i} onStepsOpen={this.onStepsOpen.bind(this, i)} onCheck={this.onCheck}/>
          )}
        </div> 
      )
  }
}
  
export default Control;
  