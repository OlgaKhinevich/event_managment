import React from 'react';
import Step from '../Step/Step';
import socket from "../../connection"; 


class Adding extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventTypeValue: 'Учебное',
      eventFormatValue: 'Конференция',
      eventNameValue: '',
      eventDateValue: '',
      eventTimeValue: '',
      eventPlaceValue: '',
      prepDateValue: '',
      stepCount: 0,
      stepNameValue: '',
      personValue: '',
      stepDateValue: '',
      stepId: 0
    };
  }

  componentDidMount(){
    
    
  }

  onSaveStep() {

    let array = [
      {
        id: 1,
        ip: 2
      }
      
    ];
    
    window.localStorage.setItem("array", JSON.stringify(array));
    array = JSON.parse(window.localStorage.getItem("array"));
  
    console.log(typeof array); 
    console.log(array); 
    
  //localStorage.setItem('array', JSON.stringify(array));
   
  }

  onEventTypeChange=(e)=>{
    const value = e.target.value;
    this.setState({
        eventTypeValue: value
    });
    console.log(this.state.eventTypeValue);
  }

  onEventFormatChange=(e)=>{
    const value = e.target.value;
    this.setState({
        eventFormatValue: value
    });
    console.log(this.state.eventFormatValue);
  }

  onEventNameInput=(e)=>{
    const value = e.target.value;
    this.setState({
        eventNameValue: value
    }); 
  }
  
  onEventDateInput=(e)=>{
    const value = e.target.value;
    this.setState({
        eventDateValue: value
    });
  }

  onEventTimeInput=(e)=>{
    const value = e.target.value;
    this.setState({
        eventTimeValue: value
    });
  }

  onEventPlaceInput=(e)=>{
    const value = e.target.value;
    this.setState({
        eventPlaceValue: value
    });
  }

  onPrepDateInput=(e)=>{
    const value = e.target.value;
    this.setState({
        prepDateValue: value
    });
  }

  onAddStepClick = () => {
    this.setState({
      stepCount: this.state.stepCount + 1
    });
  }

  onDeleteStepClick = () => {
    this.setState({
      stepCount: this.state.stepCount - 1
    });
  }

  onStepNameInput = (e) => {
    const value = e.target.value;
    this.setState({
        stepNameValue: value
    });
  }

  onPersonInput = (e) => {
    const value = e.target.value;
    this.setState({
        personValue: value
    });
  }

  onStepDateInput = (e) => {
    const value = e.target.value;
    this.setState({
      stepDateValue: value
    });
    
  }

  onAddEventClick = () => {
    socket.once("$addEvent", (status)=>{
      if(status) {
          alert("Мероприятие успешно добавлено!");
          return;
      } alert("Ошибка при добавлении мероприятия!");
  });

  socket.emit("addEvent", {
    type: this.state.eventTypeValue,
    format: this.state.eventFormatValue,
    name: this.state.eventNameValue, 
    date: this.state.eventDateValue, 
    time: this.state.eventTimeValue,
    place: this.state.eventPlaceValue,
    prep_date: this.state.prepDateValue,
    step_name: localStorage["stepName"],
    person: localStorage["person"],
    step_date: localStorage["stepDate"]
    });
  }

  render() {
    const {stepNameValue, personValue, stepDateValue, stepId} = this.state; 
      return (
        <div className="adding-content">
          <div className="adding-main">
            <label>
            Выберите тип мероприятия:
              <select value={this.state.eventTypeValue} onChange={this.onEventTypeChange}>
                <option value="Научное">Научное</option>
                <option value="Учебное">Учебное</option>
                <option value="Профориентационное">Профориентационное</option>
                <option value="Другое">Другое</option>
              </select>
            </label>
            <label>
            Выберите формат проведения:
              <select value={this.state.eventFormatValue} onChange={this.onEventFormatChange}>
                <option value="Конференция">Конференция</option>
                <option value="Конкурс">Конкурс</option>
                <option value="Заседание">Заседание</option>
                <option value="Праздничный концерт">Праздничный концерт</option>
                <option value="День открытых дверей">День открытых дверей</option>
                <option value="Семинар">Семинар</option>
                <option value="Круглый стол">Круглый стол</option>
                <option value="Фестиваль">Фестиваль</option>
                <option value="Выставка">Выставка</option>
              </select>
            </label>
            <label>
              Название мероприятия:
              <input type="text" value={this.state.eventNameValue} onInput={this.onEventNameInput}/>
            </label>
            <label>
              Дата проведения мероприятия:
              <input type="date" value={this.state.eventDateValue} onChange={this.onEventDateInput}/>
            </label>
            <label>
              Время проведения мероприятия:
              <input type="time" value={this.state.eventTimeValue} onChange={this.onEventTimeInput}/>
            </label>
            <label>
              Место проведения мероприятия:
              <input type="text" value={this.state.eventPlaceValue} onChange={this.onEventPlaceInput}/>
            </label>
            <label>
              Дата начала подготовки к мероприятию:
              <input type="date" value={this.state.prepDateValue} onChange={this.onPrepDateInput}/>
            </label>
            <button className="adding-btn" onClick={this.onAddEventClick}>Добавить мероприятие</button>
          </div>
          <div className="adding-steps">
            <Step 
            onStepNameInput={this.onStepNameInput} onPersonInput={this.onPersonInput} onStepDateInput={this.onStepDateInput}
            stepNameValue={stepNameValue} personValue={personValue} stepDateValue={stepDateValue} key={stepId}
             />
            {[...Array(this.state.stepCount)].map(() => <Step 
            onStepNameInput={this.onStepNameInput} onPersonInput={this.onPersonInput} onStepDateInput={this.onStepDateInput}
            stepNameValue={stepNameValue} personValue={personValue} stepDateValue={stepDateValue} key={stepId}
            />)}
            <button onClick={this.onAddStepClick}>Добавить этап</button>
            <button onClick={this.onSaveStep}>Сохранить</button>
            <button onClick={this.onDeleteStepClick}>Удалить этап</button>
          </div>
        </div>
      );
    }
  }
  
  export default Adding;
  