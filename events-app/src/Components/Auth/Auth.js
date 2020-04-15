import React, {Component, Fragment} from "react";
import {Link} from "react-router-dom";

class Auth extends Component {
    constructor(props) {
        super(props);

        this.state = {
            auth_mode: "signin"
        }
    }

    setAuthMode = (mode)=> {
        this.setState({
           auth_mode: mode
        })
    }

    componentDidMount(){
        const {setFullscreenMode} = this.props;
        setFullscreenMode(true);
    }

    componentWillUnmount(){
        const {setFullscreenMode} = this.props;
        setFullscreenMode(false);
    }

    render() {
    const {setAuthMode, auth_mode} = this.state;
      return (
            <Fragment>
            <div className="authorization">
                <h2 className={auth_mode==="signin" ? "": "hidden"}>ВХОД</h2>
                <h2 className={auth_mode==="signup" ? "": "hidden"}>РЕГИСТРАЦИЯ</h2>
                <input type="text" placeholder="E-mail"></input>
                <input type="text" placeholder="Фамилия" className={auth_mode==="signup" ? "": "hidden"}></input>
                <input type="text" placeholder="Имя" className={auth_mode==="signup" ? "": "hidden"}></input>
                <input type="text" placeholder="Отчество" className={auth_mode==="signup" ? "": "hidden"}></input>
                <input type="text" placeholder="Пароль"></input>
                <input type="text" placeholder="Повторите пароль" className={auth_mode==="signup" ? "": "hidden"}></input>
                <button className={auth_mode==="signin" ? "": "hidden"}>Войти</button>
                <button className={auth_mode==="signup" ? "": "hidden"}>Зарегистрироваться</button>
                <div className={auth_mode==="signin" ? "links-container": "hidden"}>
                    <Link to="/#" onClick={()=>this.setAuthMode("signup")} className="links">Зарегистрироваться</Link>
                </div>
                <div className={auth_mode==="signup" ? "links-container": "hidden"}>
                    <Link to="/#" onClick={()=>this.setAuthMode("signin")} className="links">Войти</Link>
                </div>
                <Link to="/chart">Home Page</Link>
                
            </div>
        </Fragment>
      );
    }
  }

export default Auth;
