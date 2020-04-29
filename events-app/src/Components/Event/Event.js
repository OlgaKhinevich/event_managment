import React from 'react';

class Event extends React.Component {
    render() {
      return (
        <div className="control-event">
            <div className="event-name">{this.state.eventName}</div>
            <div className="event-date"></div>
        </div>
      );
    }
  }
  
  export default Event;