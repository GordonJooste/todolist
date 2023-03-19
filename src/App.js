import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';

function App() {

  const data = {projectArr:[ {title: 'Project 1', tasks: {tasks: [ {title: 'task1', description: 'task 1 description is nice and long', complete: true, date: new Date(2023,3,2) }, {title: 'task2', description: 'task 2 description is nice and long', complete: false, date: new Date(2023,3,2) }], total: 2, completed: 1 } }, {title: 'Project 2', tasks: {tasks: [ {title: 'p2task1', description: 'Project2 task 1 description is nice and long', complete: true, date: new Date(2023,3,2) }, {title: 'P2task2', description: 'Project 2 task 2 description is nice and long', complete: false, date: new Date(2023,3,2) }], total: 2, completed: 1 } }]};
  const projects = data.projectArr;
  const selectedProject = projects[0]
  const tasks = selectedProject.tasks.tasks;
  const selectedDate = new Date(Date.now());
  const {day1,day2,day3,day4,day5} = { day1: new Date(selectedDate.getTime()+100000000),day2:new Date(selectedDate.getTime()+200000000),day3:new Date(selectedDate.getTime()+300000000),day4:new Date(selectedDate.getTime()+400000000),day5: new Date(selectedDate.getTime()+500000000)};
  const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  let checked = false;

  const handleClick = (e)=>{
    console.log('you clicked the box!');
    return !checked;
  }

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
          <div>
              TODO Add Task
          </div>
            <ul>
            {tasks.map(task =>{
              return (
                <li key={task.title}>
                  <input type="checkbox" checked={checked} onClick={handleClick()}/>
                  <h5>{task.title}</h5>
                  <article>{task.description}</article>
                  <article>TODO: Time of task</article>
                </li>
                )
            })}
            </ul>
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
