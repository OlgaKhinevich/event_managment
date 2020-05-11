import React from 'react';
import Event from '../Event/Event';

/*getEventInfo = () => {
socket.on("$getBookingInfo", (info)=>{
  try{
     if(!info) throw new Error("Ошибка во время получения информации о туре!");
  }
  catch(err){
    console.log(err);
  }
});
}*/

class Control extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      events: [
        {eventNameValue: 'Мероприятие 1',  eventDateValue: '10.01.20', percent: '50%',  open: false, eventId: 0},
        {eventNameValue: 'Мероприятие 2',  eventDateValue: '10.02.20', percent: '30%',  open: false, eventId: 1}
      ],
      steps: [
        {stepNameValue: 'Начать подготовку', stepDateValue: '10.01.20', isDone: false, stepId: 0},
        {stepNameValue: 'Сделать документацию', stepDateValue: '10.02.20', isDone: true, stepId: 1}
      ]
    }; 

  }

  
  onStepsOpen = (index)=>{
    console.log(index);
    this.setState(this.state.events.map((event, i) => {
      if (i === index) {
        event.open = !event.open
      } else {
        event.open = false;
      }
      return event;
    }))
  }


  render() {
      const {events, steps, index} = this.state;
      return (
        <div className="control-content">
          {events.map((event, i) => 
            <Event event={event} steps={steps} index={i} onStepsOpen={this.onStepsOpen.bind(this, index)} />
          )}
        </div> 
      )
  }
}
  
  export default Control;
  