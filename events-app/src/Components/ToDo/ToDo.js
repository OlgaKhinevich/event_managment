import React from 'react';
import done from './done.png';
import notDone from './notDone.png'

const ToDo = ({step, presentDate, doStep}) => {

  return (
        <div className="to-do" onClick={doStep}>
            {step.stepName+'  '+presentDate(step.stepDate) +'  '} 
            <img src={step.isDone == 1 ? done : notDone} alt="check"></img>
        </div>
      )
  }
  
  export default ToDo;