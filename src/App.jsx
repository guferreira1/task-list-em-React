import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {v4 as uuidv4} from 'uuid'
import { BrowserRouter as Router, Route} from 'react-router-dom';

import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import Header from './components/Header';
import TaskDetails from './components/TaskDetails';

import "./App.css";

const App = () => {

  const [tasks, setTasks] = useState([
    {
      id: '1',
      title: 'Estudar Programação',
      completed: false,
    },
    {
      id: '2',
      title: 'Ler Livros',
      completed: true
    }
  ])

  useEffect(() => {
    const fetchTasks = async () => {
      const {data} = await axios.get('https://jsonplaceholder.cypress.io/todos?_limit=10');
    
      setTasks(data)
    }   
    
    fetchTasks()
  }, [])

  const handleTaskClick = (taskId) => {
    const newTasks = tasks.map(task => {
      if (task.id === taskId) return { ...task, completed: !task.completed}

      return task;
    });

    setTasks(newTasks)
  };

  const handleTaskAddition = (taskTitle) => {
    const newTask = [... tasks, {
      title: taskTitle,
      id: uuidv4(),
      completed: false,
    }]
    setTasks(newTask);
  };

  const handleRemoveTask = (taskId) => {
    const newTasks = tasks.filter(task => task.id !== taskId)

    setTasks(newTasks)
  }

  return (
    <Router>
        <div className="container">
          <Header />
          <Route path="/" exact render={() =>(
            <>
              <AddTask handleTaskAddition={handleTaskAddition} /> 
              <Tasks tasks={tasks}
              handleTaskClick={handleTaskClick}
              handleRemoveTask={handleRemoveTask}
              />

            </>
          )}/>
          <Route path="/:taskTitle" exact component={TaskDetails}/>
        </div>
       
    </Router>
  );
  
};

export default App;