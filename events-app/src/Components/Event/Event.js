import React from 'react';
import ToDo from '../ToDo/ToDo';

const Event = ({event, steps, index, onStepsOpen} ) => {
    return (
        <div className="control-event" >
              <div className="control-info" onClick={onStepsOpen} key={index}>
                <div className="event-name">{event.eventNameValue}</div>
                <div className="event-date">{event.eventDateValue}</div>
                <div className="percent">{event.percent}</div>
                <div className="buttons">
                <button>Редактировать</button>
                <button>Удалить</button>
              </div>
              </div>
              <div className={event.open ? 'control-steps open' : 'control-steps'}>
                {steps.map((step) => 
                  <ToDo step={step}/>
                )}
              </div> 
            </div>
      )
}
  
export default Event;