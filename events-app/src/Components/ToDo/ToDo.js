import React from 'react';

const ToDo = ({step}) => {

  return (
        <div className="to-do" key={step.stepId}>
          <div>
            {step.stepName+'  '+step.stepDate +'  '}
            {step.isDone ? <p>Сделано</p> : <p>Не сделано</p>}
          </div>  
        </div>
      )
  }
  
  export default ToDo;