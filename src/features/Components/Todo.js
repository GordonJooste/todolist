import { useDispatch } from 'react-redux';
import { removeTask } from "../projects/projectsSlice";

export const Todo = (props) =>{
    
    const {tasks, handleOnChange, handleNewTaskSubmit, handleNewTaskChange, selectedProject, newTask} = props;
    const dispatch = useDispatch();


    return (
        <div className='Todo'>
          <h3>All Tasks for today</h3>
          <div className='column'>
            <ul>
            {tasks.tasks.map(task =>{
              return (
                <li key={task.title}>
                  <button style={{ float: 'right'}} onClick={() =>{dispatch(removeTask({projectTitle: selectedProject.title, taskTitle: task.title, completed: task.complete})); }}>X</button>
                  <input
                      type="checkbox"
                      id={`custom-checkbox-${task.title}`}
                      name={task.title}
                      value={task.title}
                      checked={task.complete}
                      onChange={() => handleOnChange(selectedProject.title,task.title, task.complete)}
                    />
                  <h5>{task.title}</h5>
                  <article>{task.description}</article>
                  <article>{task.date.getDate()}/{task.date.getMonth()}/{task.date.getFullYear()}</article>
                </li>
                )
            })}
            </ul>
          <div>
          <ul><li>
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
          </li></ul>
          </div>
            <div className='statistics'>
              <h4>{selectedProject.tasks.total !==0 ? (selectedProject.tasks.completed/selectedProject.tasks.total)*100 : 0} % Completed</h4>
            </div>
          </div>
      </div>)
    }