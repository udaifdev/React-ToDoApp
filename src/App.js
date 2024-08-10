import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // State to store the list of to-do items
  const [to_Dos, set_ToDos] = useState([]);
  // State to store the current input value
  const [toDo, setToDo] = useState('');
  // State to store the current day of the week
  const [day, setDay] = useState('');

  // This runs once when the component loads to get the current day
  useEffect(() => {
    const getCurrentDay = () => {
      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const today = new Date().getDay(); // Get the current day as a number (0-6)
      return days[today]; // Return the name of the day (e.g., "Sunday")
    };
    setDay(getCurrentDay()); // Set the day state with the current day name
  }, []);

  const funDlt = () => {
    alert('Are You Sure To Delete')
  }

  return (
    <div className="app">
      {/* Heading of the app */}
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>

      {/* Subheading with the current day */}
      <div className="subHeading">
        <br />
        <h2>Whoop, it's {day} 🌝 ☕ </h2>
      </div>

      {/* Input field to add new to-do items */}
      <div className="input">
        <input value={toDo} onChange={(e) => setToDo(e.target.value)} type="text" placeholder="Things ToDo...🖊️" />
        {/* Button to add the new item to the to-do list */}
        <i onClick={() => {
          // Add the new to-do item to the list
          if (toDo.trim()) {
            set_ToDos([...to_Dos, { id: Date.now(), text: toDo, status: false }]);
            setToDo(''); // Clear the input field
          }
        }}
          className="fas fa-plus"> </i>
      </div>

      {/* Display the list of to-do items */}
      <div className="todos">
        {to_Dos.map((obj) => {
          return (
            <div className="todo" key={obj.id}>
              <div className="left">
                {/* Checkbox to mark the item as done */}
                <input onChange={(e) => {
                  set_ToDos(to_Dos.map(obj2 => {
                    if (obj2.id === obj.id) {
                      obj2.status = e.target.checked; // Update the status of the item
                    }
                    return obj2;
                  }));
                }}
                  checked={obj.status}
                  type="checkbox"
                />

                {/* Display the to-do text with a line-through if done */}
                <p className={obj.status ? 'done' : ''}>
                  {obj.text}
                </p>
              </div>

              {/* Button to delete the item from the list */}
              <div className="right">
                <i onClick={() =>{ funDlt(); set_ToDos(to_Dos.filter((obj2) => obj2.id !== obj.id))}} className="fas fa-times"> </i>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
