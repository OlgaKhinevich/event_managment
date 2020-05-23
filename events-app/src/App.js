import React from 'react';
import Sidebar from './Components/Sidebar/Sidebar';
import Adding from './Components/Adding/Adding';
import Control from './Components/Control/Control';
import Auth from "./Components/Auth/Auth";
import Chart from './Components/Chart/Chart';
import Print from './Components/Print/Print';
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

  render() {
    const {isFullscreenComponent} = this.state;
    return (
      <BrowserRouter>
      <div className="App">
        {!isFullscreenComponent && <Sidebar/>}
        <Route exact path="/" render={()=><Auth setFullscreenMode={this.setFullscreenMode}/>}/>
        <div className="main">
        <Switch> 
          <Route path="/add" render={()=><Adding />} />
          <Route path="/print" render={()=><Print setFullscreenMode={this.setFullscreenMode}/>}/>
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
