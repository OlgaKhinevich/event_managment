import React from 'react';

const Header = (props) =>  {
  console.log(props.heading);
      return (
        <div className="header-content">
          {props.heading}
        </div>
      );
  }
  
  export default Header;