import React, {Component, Fragment} from "react";
import {Link} from "react-router-dom";
import socket from "../../connection"; 
import image from "./auth.png";

class Auth extends Component {
    constructor(props) {
        super(props);

        this.state = {
            auth_mode: "signin",
            emailValue: "",
            surnameValue: "",
            nameValue: "",
            patronymicValue: "",
            passwordValue: "",
            reppassword: ""
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

    onEmailInput=(e)=>{
        const value = e.target.value;
        this.setState({
            emailValue: value
        });
    }

    onPasswordInput=(e)=>{
        const value = e.target.value;
        this.setState({
            passwordValue: value
        });
    }

    onSurnameInput=(e)=>{
        const value = e.target.value;
        this.setState({
           surnameValue: value
        });
    }

    onNameInput=(e)=>{
        const value = e.target.value;
        this.setState({
           nameValue: value
        });
    }

    onPatrInput=(e)=>{
        const value = e.target.value;
        this.setState({
           patronymicValue: value
        });
    }

    onRepeatPassInput=(e)=>{
        const value = e.target.value;
        this.setState({
           reppassword: value
        });
    }

    onSigninClick = ()=>{
        socket.once("$login", (status)=>{
            if(status) {
                alert("Вход прошел успешно!");
                this.props.history.push('/chart');
                return;
            } alert("Ошибка при входе!");
        });
        socket.emit("login", {email: this.state.emailValue, password: this.state.passwordValue});
    }

    onSignupClick = ()=>{
        socket.once("$addUser", (status)=>{
            if(status) {
                alert("Пользователь успешно добавлен!");
                return;
            } alert("Ошибка при добавлении пользователя!");
        });
        socket.emit("addUser", {
            email: this.state.emailValue, 
            surname: this.state.surnameValue, 
            name: this.state.nameValue, 
            patronymic: this.state.patronymicValue, 
            password: this.state.passwordValue
        });
    }
    
    render() {
    const {auth_mode} = this.state;
      return (
            <Fragment>
            <div className="authorization">
                <img src={image} alt="image"></img>
                <h2 className={auth_mode==="signin" ? "": "hidden"}>ВХОД</h2>
                <h2 className={auth_mode==="signup" ? "": "hidden"}>РЕГИСТРАЦИЯ</h2>
                <input type="text" placeholder="E-mail" value={this.state.emailValue} onInput={this.onEmailInput}></input>
                <input type="text" placeholder="Фамилия" className={auth_mode==="signup" ? "": "hidden"} value={this.state.surnameValue} onInput={this.onSurnameInput}></input>
                <input type="text" placeholder="Имя" className={auth_mode==="signup" ? "": "hidden"} value={this.state.nameValue} onInput={this.onNameInput}></input>
                <input type="text" placeholder="Отчество" className={auth_mode==="signup" ? "": "hidden"} value={this.state.patronymicValue} onInput={this.onPatrInput}></input>
                <input type="text" placeholder="Пароль" value={this.state.passwordlValue} onInput={this.onPasswordInput}></input>
                <input type="text" placeholder="Повторите пароль" className={auth_mode==="signup" ? "": "hidden"} value={this.state.reppassword} onInput={this.onRepeatPassInput}></input>
                <button className={auth_mode==="signin" ? "": "hidden"} onClick={this.onSigninClick}>Войти</button>
                <button className={auth_mode==="signup" ? "": "hidden"} onClick={this.onSignupClick}>Зарегистрироваться</button>
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
