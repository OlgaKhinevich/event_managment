import React from 'react';

const Step = (props) => {
  const {onStepNameInput, onPersonInput, onStepDateInput, stepNameValue, personValue, stepDateValue} = props;   
        return (
            <div className="step">
              <label>
                Название этапа:
                <input type="text"  value={stepNameValue} onInput={onStepNameInput}/>
              </label>
              <label>
                Ответственное лицо:
                <input type="text"  value={personValue} onInput={onPersonInput}/>
              </label>
              <label>
                Срок выполнения:
                <input type="date"   value={stepDateValue} onInput={onStepDateInput}/>
              </label>
            </div>
        )
}

export default Step;