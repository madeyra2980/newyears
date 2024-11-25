import React, { useState } from 'react';
import './App.css';
import headerTop from './assets/top.svg';
import titleTop from './assets/2.png';
import titleTopItem from './assets/1-2.png';
import titleBottom from './assets/2-2.png';
import titleFooter from './assets/3.png';
import axios from 'axios';
import back_logo from './assets/back.png'

function App() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    groupOrPosition: '',
  });

  const TELEGRAM_BOT_TOKEN = '7964767216:AAExtiz5JR-H40tbQzP3G6LETUznlzqip3A'; 
  const TELEGRAM_CHAT_ID = '7449665353'; 

  const handleRoleChange = (event) => {
    const role = event.target.value;
    setSelectedRole(role);
    setFormData({ firstName: '', lastName: '', groupOrPosition: '' }); 
    setModalOpen(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedRole('');
  };

  const sendToTelegram = async (message) => {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    try {
      await axios.post(url, {
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
      });
      alert('Данные успешно отправлены в Telegram!');
    } catch (error) {
      console.error('Ошибка при отправке в Telegram:', error);
      alert('Не удалось отправить данные в Telegram.');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { firstName, lastName, groupOrPosition } = formData;

    const roleMessage =
      selectedRole === 'student'
        ? `🧑‍🎓 Студент\nИмя: ${firstName}\nФамилия: ${lastName}\nГруппа: ${groupOrPosition}`
        : selectedRole === 'teacher'
        ? `👨‍🏫 Преподаватель\nИмя: ${firstName}\nФамилия: ${lastName}\nДолжность: ${groupOrPosition}`
        : `👤 Другое\nИмя: ${firstName}\nФамилия: ${lastName}\nДолжность: ${groupOrPosition}`;

    sendToTelegram(roleMessage);
    closeModal();
  };

  return (
    <div className="App">
      <div className="container">
        <header>
          <img src={headerTop} alt="Header Top" />
        </header>

        <div className="marry-christmas">
          <img src={titleTop} alt="Новогодний заголовок" />
        </div>

        <div className="title-top">
          <p>Присоединяйся к нашему новогоднему празднику!</p>
        </div>

        <div className="title-description">
          <p>
            Дорогие студенты и преподаватели Innovative College!
            Новый год уже на пороге, и мы готовим для вас незабываемую вечеринку! 🥳
            Танцы, музыка, веселье и море сюрпризов ждут тебя! Приходи, чтобы вместе встретить
            2025 год в компании самых крутых людей!
          </p>
        </div>

        <div className="title-item">
          <div className="title-item-top">
            <img src={titleTopItem} alt="Верхний элемент" />
          </div>

          <div className="title-time-description">
            <h1>Дата и время:</h1>
            <p>19 декабря</p>
          </div>

          <div className="title-location-description">
            <h1>Место:</h1>
            <p>Глинки 40</p>
            <h1>Время:</h1>
            <p>15:00</p>
          </div>

          <div className="title-item-bottom">
            <img src={titleBottom} alt="Нижний элемент" />
          </div>
        </div>

        <div className="title-item-middle">
            <img src={back_logo} alt='z'/>
          <div className="title-item-top">
            <img src={titleTopItem} alt="Элемент по центру" />
          </div>
        </div>
        <div className="form-item">
          <h1>Выберите свою роль:</h1>
          <div className="form-item-data">
            <form>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="student"
                  onChange={handleRoleChange}
                />{' '}
                Студент
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="teacher"
                  onChange={handleRoleChange}
                />{' '}
                Преподаватель
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="other"
                  onChange={handleRoleChange}
                />{' '}
                Другое
              </label>
            </form>
          </div>
        </div>
        <div className="footer">
          <img src={titleFooter} alt="footer" />
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Вы выбрали роль: {selectedRole === 'student' ? 'Студент' : selectedRole === 'teacher' ? 'Преподаватель' : 'Другое'}</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Имя:
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Фамилия:
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                {selectedRole === 'student' ? 'Название группы:' : 'Должность:'}
                <input
                  type="text"
                  name="groupOrPosition"
                  value={formData.groupOrPosition}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <button type="submit">Сохранить</button>
            </form>
            <button className="close-btn" onClick={closeModal}>
              Закрыть
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
