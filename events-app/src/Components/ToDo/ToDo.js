import React from 'react';

const ToDo = ({step}) => {
  return (
        <div className="to-do" key={step.stepId}>
          <div>
            {step.stepNameValue+'  '+step.stepDateValue}
          </div>  
        </div>
      )
  }
  
  export default ToDo;