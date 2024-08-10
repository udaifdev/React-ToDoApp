import React, { useState, useEffect } from 'react';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [to_Dos, set_ToDos] = useState([]);
  const [toDo, setToDo] = useState('');
  const [day, setDay] = useState('');

  useEffect(() => {
    const getCurrentDay = () => {
      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const today = new Date().getDay();
      return days[today];
    };
    setDay(getCurrentDay());
  }, []);

  return (
    <div className="app">
      <ToastContainer limit={1} />
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>

      <div className="subHeading">
        <br />
        <h2>Whoop, it's {day} 🌝 ☕ </h2>
      </div>

      <div className="input">
        <input
          value={toDo}
          onChange={(e) => setToDo(e.target.value)}
          type="text"
          placeholder="Things ToDo...🖊️"
        />
        <i
          onClick={() => {
            if (toDo.trim()) {
              set_ToDos([...to_Dos, { id: Date.now(), text: toDo, status: false }]);
              setToDo('');

              toast.success('To-Do added successfully!', {
                position: 'top-center',
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              });
            }
          }}
          className="fas fa-plus"
        ></i>
      </div>

      <div className="todos">
        {to_Dos.map((obj) => (
          <div className="todo" key={obj.id}>
            <div className="left">
              <input
                onChange={(e) => {
                  set_ToDos(
                    to_Dos.map((obj2) => {
                      if (obj2.id === obj.id) {
                        obj2.status = e.target.checked;
                      }
                      return obj2;
                    })
                  );
                }}
                checked={obj.status}
                type="checkbox"
              />
              <p className={obj.status ? 'done' : ''}>{obj.text}</p>
            </div>

            <div className="right">
              <i
                onClick={() => {
                  toast.info('To-Do deleted!', {
                    position: 'top-center',
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                  });
                  set_ToDos(to_Dos.filter((obj2) => obj2.id !== obj.id));
                }}
                className="fas fa-times"
              ></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
