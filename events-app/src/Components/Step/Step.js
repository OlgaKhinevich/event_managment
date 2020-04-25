import React from 'react';

class Step extends React.Component {
    render() {
        return (
            <div className="step">
              <label>
                Название этапа:
                <input type="text"/>
              </label>
              <label>
                Ответственное лицо:
                <input type="text"/>
              </label>
              <label>
                Срок выполнения:
                <input type="date"/>
              </label>
            </div>
        )
    }
}

export default Step;