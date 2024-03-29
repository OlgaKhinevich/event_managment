import React from 'react';
import ToDo from '../ToDo/ToDo';
import {Link} from 'react-router-dom';

function Event ({event, steps, onStepsOpen, doStep} ) {
  
  const presentDate = (serverDateString) => {
    let serverDate = new Date(serverDateString);
    let day1 = serverDate.getDate();
    let day = addZeros(day1);
    let month1 = serverDate.getMonth()+1;
    let month = addZeros(month1);
    let year = serverDate.getFullYear();
    let date = `${day}.${month}.${year}`;
    return date;
    
  };

  const addZeros = (number) => {
    if(number<10) {
        return "0" + number;
    }
    else {return number;}
  }

  

  

  return (
        <div className="control-event" >
              <div className="control-info" onClick={onStepsOpen}>
                <div className="event-name">{event.name}</div>
                <div className="event-date">{presentDate(event.date)}</div>
                <div className="percent">{event.percent}</div>
                <div className="buttons">
                <button><Link to="/print">Печать</Link></button>
                <button className="delete-btn">Удалить</button>
              </div>
              </div>
              <div className={event.open ? 'control-steps open' : 'control-steps'}>
                {
                 steps.map((step, j) =>  
                  <ToDo step={step} key={j} presentDate={presentDate} doStep={()=>doStep(step.stepId)} />
                  )
                }

              </div> 
            </div>
    )
}
  
export default Event;