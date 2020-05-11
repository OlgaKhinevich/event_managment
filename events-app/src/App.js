import React from 'react';
import Sidebar from './Components/Sidebar/Sidebar';
import Adding from './Components/Adding/Adding';
import Control from './Components/Control/Control';
import Header from './Components/Header/Header';
import Auth from "./Components/Auth/Auth";
import Chart from './Components/Chart/Chart';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFullscreenComponent: false,
      heading: ""
    }
  }

  setFullscreenMode = (mode)=>{
    this.setState({
      isFullscreenComponent: mode
    })
  }

  setHeading = (name) => {
    this.setState({
      heading: name
    })
    console.log(this.state.heading);
  }

  render() {
    const {isFullscreenComponent, heading} = this.state;
    return (
      <BrowserRouter>
      <div className="App">
        {!isFullscreenComponent && <Sidebar/>}
        {!isFullscreenComponent && <Header heading={heading}/>}
        <Route exact path="/" render={()=><Auth setFullscreenMode={this.setFullscreenMode}/>}/>
        <div className="main">
        <Switch> 
          <Route path="/add" render={()=><Adding />} />
          <Route path="/chart" render={()=><Chart />} />
          <Route path="/control" render={()=><Control /> } />
        </Switch>
        </div>    
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
