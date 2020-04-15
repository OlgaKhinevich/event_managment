import React from 'react';
import { Link} from 'react-router-dom'; 

export default class Sidebar extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            mode: "chart"
        }
      }
    
    setMode = (mode)=>{
        this.setState({
            mode: mode
        })
    }
    
    render() {
        const {mode} = this.state;   
        return (
            <div className='sidebar'>
                <div className="sidebar-content">
                    <div className="profile">
                        <p>Профиль</p>
                    </div>                         
                    <div className={mode==="adding" ? "active": "adding"}>
                        <div className="adding-mask"></div>
                        <Link to="/add" onClick={()=>this.setMode("adding")}>Добавить мероприятие</Link>
                    </div>
                    <div className={mode==="chart" ? "active": "chart"}>
                        <div className="chart-mask"></div>
                        <Link to="/chart" onClick={()=>this.setMode("chart")}>График мероприятий</Link>
                    </div>
                    <div className={mode==="control" ? "active": "control"}>
                        <div className="control-mask"></div>
                        <Link to="/control" onClick={()=>this.setMode("control")}>Контроль</Link>
                   </div>
                </div>
            </div>
        );
    }
}