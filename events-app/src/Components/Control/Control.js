import React from 'react';
import Event from '../Event/Event';

/*getEventInfo = () => {
socket.on("$getBookingInfo", (info)=>{
  try{
     if(!info) throw new Error("Ошибка во время получения информации о туре!");
  }
  catch(err){
    console.log(err);
  }
});
}*/

class Control extends React.Component {
    render() {
      return (
        <div className="control-content">
         <Event />
        </div>
      );
    }
  }
  
  export default Control;
  