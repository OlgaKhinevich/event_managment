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
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Отправленное имя: ' + this.state.value);
    event.preventDefault();
  }

  render() {
      return (
        <div className="adding-content">
          <div className="adding-main">
            <label>
            Выберите тип мероприятия:
              <select value={this.state.value} onChange={this.handleChange}>
                <option value="grapefruit">Научное</option>
                <option value="lime">Учебное</option>
                <option value="coconut">Профориентационное</option>
                <option value="mango">Другое</option>
              </select>
            </label>
            <label>
            Выберите формат проведения:
              <select value={this.state.value} onChange={this.handleChange}>
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
              <input type="text" value={this.state.value} onChange={this.handleChange}/>
            </label>
            <label>
              Дата проведения мероприятия:
              <input type="date" value={this.state.value} onChange={this.handleChange}/>
            </label>
            <label>
              Время начала проведения мероприятия:
              <input type="time" value={this.state.value} onChange={this.handleChange}/>
            </label>
            <label>
              Время окончания проведения мероприятия:
              <input type="time" value={this.state.value} onChange={this.handleChange}/>
            </label>
            <label>
              Место проведения мероприятия:
              <input type="text" value={this.state.value} onChange={this.handleChange}/>
            </label>
            <label>
              Дата начала подготовки к мероприятию:
              <input type="date" value={this.state.value} onChange={this.handleChange}/>
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
  