import React from 'react';
import ToDo from '../ToDo/ToDo';

function Event ({event, steps, onStepsOpen, onCheck} ) {
  
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
                <button>Редактировать</button>
                <button>Удалить</button>
              </div>
              </div>
              <div className={event.open ? 'control-steps open' : 'control-steps'}>
                {
                 steps.map((step, i) =>  
                  <ToDo step={step} key={i} onCheck={onCheck} />
                  )
                }

              </div> 
            </div>
    )
}
  
export default Event;