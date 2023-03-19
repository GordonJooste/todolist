import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import { selectProjectArr, addTask, addProject, removeProject, removeTask } from './features/projects/projectsSlice';

function App() {

  const dispatch = useDispatch();
  const projects = useSelector(selectProjectArr);

  const selectedProject = projects[0]
  const tasks = selectedProject.tasks.tasks;
  const selectedDate = new Date(Date.now());
  const {day1,day2,day3,day4,day5} = { day1: new Date(selectedDate.getTime()+100000000),day2:new Date(selectedDate.getTime()+200000000),day3:new Date(selectedDate.getTime()+300000000),day4:new Date(selectedDate.getTime()+400000000),day5: new Date(selectedDate.getTime()+500000000)};
  const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  let checked = false;

  const [newTask, setNewTask] = useState({});
  //TODO make the add task work. Probably a problem with the event handlers.
  const handleNewTaskChange = (event) => {
    const { name, value } = event.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleNewTaskSubmit = (event) => {
    event.preventDefault();
    dispatch(addTask({ ...newTask }));
    setNewTask({});
  };

  //make the checkboxes work
  // set up the state and redux store
  //connect redux store and state handle changes to make the site dynamic. 

  return (
    <div className="App">
      <section class="hero">
        <div class="hero-text">
          <h1>Organize Your Tasks with Ease</h1>
          <p>Keep track of your to-dos and never miss a deadline again with our intuitive task management system.</p>
        </div>
      </section>

      <div className='Projects' >
      <h3> Projects </h3>
        <div className = 'column'>  
          <ul>
           {projects.map( (project) => { 
          return (
            <li key={project.title}> 
              <h4> {project.title}</h4>
              <article> There are {project.tasks.total} tasks</article>
            </li>
                )
              }) 
            }
          </ul>
        </div>
      </div> 

      <div className='Todo'>
          <h3>All Tasks for today</h3>
          <div className='column'>
            <ul>
            {tasks.map(task =>{
              console.log(tasks);
              return (
                <li key={task.title}>
                  <input type="checkbox" checked={checked} onClick={console.log('hey ;)')}/>
                  <h5>{task.title}</h5>
                  <article>{task.description}</article>
                  <article>TODO: Time of task</article>
                </li>
                )
            })}
            </ul>
          <div>
                <form onSubmit={handleNewTaskSubmit}>
        <label>
          Task Title:
          <input
            type="text"
            name="title"
            value={newTask.title || ''}
            onChange={handleNewTaskChange}
          />
        </label>
        <br />
        <label>
          Task Description:
          <input
            type="text"
            name="description"
            value={newTask.description || ''}
            onChange={handleNewTaskChange}
          />
        </label>
        <br />
        <button type="submit">Add Task</button>
      </form>

          </div>
            <div className='statistics'>
              <h4>{(selectedProject.tasks.completed/selectedProject.tasks.total)*100} % Completed</h4>
            </div>
          </div>
      </div>

      <div className='Calendar'>
        <h3> Calendar</h3>
          <div className='column'>
            <ul>
              <li className = 'currentDate' key={selectedDate.getDate()}>
                <h4>{ selectedDate.getDate() }  {selectedDate.toLocaleString('default', { month: 'long' }) }</h4>
                <article> {weekday[selectedDate.getDay()]} </article>
              </li>
              <li key={day1.getDate()}>
                <article> { day1.getDate() }  { weekday[day1.getDay()]}</article>
              </li>
              <li key={day2.getDate()}>
                <article> { day2.getDate() }  { weekday[day2.getDay()]}</article>
              </li>
              <li key={day3.getDate()}>
                <article> { day3.getDate() }  { weekday[day3.getDay()]}</article>  
              </li>
              <li key={day4.getDate()}>
                <article> { day4.getDate() }  { weekday[day4.getDay()]}</article>  
              </li>
              <li key={day5.getDate()}>
                <article> { day5.getDate() }  { weekday[day5.getDay()]}</article>  
              </li>
            </ul>
              
          </div>
      </div>

    </div>
  );
}

export default App;
