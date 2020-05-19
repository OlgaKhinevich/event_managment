import React from 'react';
import done from './done.png';
import notDone from './notDone.png'

const ToDo = ({step, presentDate, onCheck}) => {

  return (
        <div className="to-do" >
            {step.stepName+'  '+presentDate(step.stepDate) +'  '} 
            <img src={step.isDone ? done : notDone} alt="check"></img>
            {/*<div classname={step.isDone ? 'done' : 'notDone'}></div>*/}
        </div>
      )
  }
  
  export default ToDo;