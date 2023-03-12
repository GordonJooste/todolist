import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchProject } from './projectsAPI';

const initialState = {
    projectArr:[ 
        {title: 'Project 1', tasks: 
            {tasks: [ 
                {title: 'task1', description: 'task 1 description is nice and long', complete: true, date: new Date(2023,3,2) }, 
                {title: 'task2', description: 'task 2 description is nice and long', complete: false, date: new Date(2023,3,2) }], total: 2, completed: 1 } }, 
        {title: 'Project 2', tasks: 
            {tasks: [ 
                {title: 'p2task1', description: 'Project2 task 1 description is nice and long', complete: true, date: new Date(2023,3,2) }, 
                {title: 'P2task2', description: 'Project 2 task 2 description is nice and long', complete: false, date: new Date(2023,3,2) }], total: 2, completed: 1 } }]}

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const incrementAsync = createAsyncThunk(
  'projects/fetchProjects',
  async (title) => {
    const response = await fetchProject(title);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addProject: (state,action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.projectArr.push(action.payload);
    },
    addTask: (state,action) => {
      const {projectTitle, taskObj} = action.payload;
      state.projectArr[state.projectArr.indexOf(projectTitle)].tasks.tasks.push(taskObj);
      state.projectArr[state.projectArr.indexOf(projectTitle)].tasks.total++;
      if(taskObj.complete){
        state.projectArr[state.projectArr.indexOf(projectTitle)].tasks.completed++;
      }
      
    },
    removeTask: (state,action) =>{
        const {projectTitle, taskTitle} = action.payload;
      
        
        state.projectArr[state.projectArr.indexOf(projectTitle)].tasks.tasks.filter(item => {
          return item.title !== taskTitle;
        })
    },
    removeProject: (state,action) => {
      const {projectTitle} = action.payload;
      state.projectArr.filter( project =>{
        return project.title !== projectTitle;
      })
    }
  },
});

export const { addProject,addTask,removeProject,removeTask } = projectsSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectProjectArr = (state) => state.projectArr;
export const selectTaskArr = (state,projectTitle) => state.projectArr[state.projectArr.indexOf(projectTitle)].tasks.tasks; 


export default projectsSlice.reducer;
