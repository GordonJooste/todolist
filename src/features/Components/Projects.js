import { useDispatch } from 'react-redux';
import { addProject } from "../projects/projectsSlice";
import React, { useState } from 'react';

export const Projects = (props) =>{
    
    const {projects, handleClick, handleProjectRemove} = props;
    const [newProject,setNewProject] = useState({});
    const dispatch = useDispatch();

    const handleNewProjectSubmit =(event)=>{
        event.preventDefault();
        dispatch(addProject(
        {title: newProject.title,
        tasks: {
          tasks: [],
          total: 0,
          completed: 0,
        },}));
        setNewProject({});
    }

    const handleNewProjectChange = (event) =>{
        const { name, value } = event.target;
        setNewProject((prevProject) =>({
            ...prevProject,
            [name]: value,
        }));
    }

    return(
        
        <div className='Projects' >
            <h3> Projects </h3>
                <div className = 'column'>  
                <ul>
                {projects.map( (project) => { 
                return (
                    <li key={project.title} onClick={() => handleClick(project.title)} > 
                        <button style={{ float: 'right'}} onClick={() =>{handleProjectRemove(project.title) }}>X</button>
                        <h4> {project.title}</h4>
                        <article> There are {project.tasks.total} tasks</article>
                    </li>
                        )
                    }) 
                    }
        
            <li>
                <form onSubmit={handleNewProjectSubmit}>
                <label>
                Task Title:
                <input
                    type="text"
                    name="title"
                    value={newProject.title || ''}
                    onChange={handleNewProjectChange}
                />
                </label>
                <br />
                <button type="submit">Add Project</button>
            </form>
          </li>
                </ul>
                </div>
            </div> 
    
    )
}