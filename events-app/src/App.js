import React from 'react';
import Sidebar from './Components/Sidebar/Sidebar';
import Adding from './Components/Adding/Adding';
import Control from './Components/Control/Control';
import Header from './Components/Header/Header';
import Messages from './Components/Messages/Messages';
import Auth from "./Components/Auth/Auth";
import Chart from './Components/Chart/Chart';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFullscreenComponent: false
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
        {!isFullscreenComponent && <Header/>}
        {!isFullscreenComponent && <Messages/>}
        <div className="main">
        <Switch>
          <Route exact path="/" render={()=><Auth setFullscreenMode={this.setFullscreenMode}/>}/>
          <Route path="/add" component={Adding} />
          <Route path="/chart" component={Chart} />
          <Route path="/control" component={Control} />
          </Switch>
        </div>    
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
