import React from 'react';

/*let AddStep = () => {
  <div className="step">
    <label>
      Название этапа:
      <input type="text" value={this.state.value} onChange={this.handleChange}/>
    </label>
    <label>
      Ответственное лицо:
      <input type="text" value={this.state.value} onChange={this.handleChange}/>
    </label>
    <label>
      Срок выполнения:
      <input type="date" value={this.state.value} onChange={this.handleChange}/>
    </label>
  </div>
}*/

class Adding extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventTypeValue: '',
      eventFormatValue: '',
      eventNameValue: '',
      eventDateValue: '',

    };
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
    console.log(this.state.eventNameValue);
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
  

  render() {
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
                <option value="grapefruit">Конференция</option>
                <option value="lime">Конкурс</option>
                <option value="coconut">Заседание</option>
                <option value="mango">Праздничный концерт</option>
                <option value="mango">День открытых дверей</option>
                <option value="mango">Семинар</option>
                <option value="mango">Круглый стол</option>
                <option value="mango">Фестиваль</option>
                <option value="mango">Выставка</option>
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
            <button className="adding-btn">Добавить мероприятие</button>
          </div>
          <div className="adding-steps">
            <div className="step">
              <label>
                Название этапа:
                <input type="text" value={this.state.value} onChange={this.handleChange}/>
              </label>
              <label>
                Ответственное лицо:
                <input type="text" value={this.state.value} onChange={this.handleChange}/>
              </label>
              <label>
                Срок выполнения:
                <input type="date" value={this.state.value} onChange={this.handleChange}/>
              </label>
            </div>
            <button onClick="">Добавить этап</button>
          </div>
        </div>
      );
    }
  }
  
  export default Adding;
  