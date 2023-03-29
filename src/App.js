import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import { selectProjectArr, addTask, setTaskComplete, setTaskIncomplete, removeProject } from './features/projects/projectsSlice';
import { Projects } from './features/Components/Projects';
import { Calendar } from './features/Components/Calendar';
import { Todo } from './features/Components/Todo';

function App() {

  const dispatch = useDispatch();
  const projects = useSelector(selectProjectArr);

  const [selectedProject, setSelectedProject] = useState({project: 0}); 
  const selectedDate = new Date(Date.now());
  const {day1,day2,day3,day4,day5} = { day1: new Date(selectedDate.getTime()+100000000),day2:new Date(selectedDate.getTime()+200000000),day3:new Date(selectedDate.getTime()+300000000),day4:new Date(selectedDate.getTime()+400000000),day5: new Date(selectedDate.getTime()+500000000)};
  

  const [newTask, setNewTask] = useState({});


  const handleOnChange = (projectName,taskName, complete) =>{
    console.log(projectName + taskName);
    if(complete){
      dispatch(setTaskIncomplete({projectTitle: projectName, taskTitle: taskName}));
    }
    else{
      dispatch(setTaskComplete({projectTitle: projectName, taskTitle: taskName}));
    }
    
  };

  const handleNewTaskChange = (event) => {
    const { name, value } = event.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleNewTaskSubmit = (event) => {
    event.preventDefault();
    dispatch(addTask({ projectTitle: projects[selectedProject.project].title, taskObj: {title: newTask.title, description: newTask.description, complete: false, date: new Date(selectedDate.getTime()+500000000)} }));
    setNewTask({});
  };

  const handleClick = (projectTitle) =>{
    const projectIndex = projects.findIndex(
      (project) => project.title === projectTitle
    );
    setSelectedProject(() => ({
      project: projectIndex
    }));
    console.log('click');
    console.log(projects[0]);
    console.log('click')
  };

  const handleProjectRemove = (projectTitle) =>{
    setSelectedProject(()=>({
      project: 1
    }))
    dispatch(removeProject({projectTitle: projectTitle}))
    console.log(projects[0]);
  }

  return (
    <div className="App">
      <section className="hero">
        <div className="hero-text">
          <h1>Organize Your Tasks with Ease</h1>
          <p>Keep track of your to-dos and never miss a deadline again with our intuitive task management system.</p>
        </div>
      </section>

      <Projects projects={projects} handleClick={handleClick} handleProjectRemove={handleProjectRemove} />

      <Todo tasks={projects[selectedProject.project].tasks} handleOnChange={handleOnChange} handleNewTaskSubmit={handleNewTaskSubmit} handleNewTaskChange={handleNewTaskChange} selectedProject={projects[selectedProject.project]} newTask={newTask} />

      <Calendar selectedDate={selectedDate} day1={day1} day2={day2} day3={day3} day4={day4} day5={day5}  />

    </div>
  );
}

export default App;
