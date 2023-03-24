import { createSlice } from '@reduxjs/toolkit';


// TODO ADD TASK COMPLETE AND INCOMPLETE EDITOR IN ACTIONS
const initialState = {
  projectArr: [
    {
      title: 'Project 1',
      tasks: {
        tasks: [
          {
            title: 'task1',
            description: 'task 1 description is nice and long',
            complete: true,
            date: new Date(2023, 3, 2),
          },
          {
            title: 'task2',
            description: 'task 2 description is nice and long',
            complete: false,
            date: new Date(2023, 3, 2),
          },
        ],
        total: 2,
        completed: 1,
      },
    },
    {
      title: 'Project 2',
      tasks: {
        tasks: [
          {
            title: 'p2task1',
            description: 'Project2 task 1 description is nice and long',
            complete: true,
            date: new Date(2023, 3, 2),
          },
          {
            title: 'P2task2',
            description: 'Project 2 task 2 description is nice and long',
            complete: false,
            date: new Date(2023, 3, 2),
          },
        ],
        total: 2,
        completed: 1,
      },
    },
  ],
};

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    addProject: (state, action) => {
      state.projectArr.push(action.payload);
    },
    addTask: (state, action) => {
      const { projectTitle, taskObj } = action.payload;
      const projectIndex = state.projectArr.findIndex(
        (project) => project.title === projectTitle
      );
      state.projectArr[projectIndex].tasks.tasks.push(taskObj);
      state.projectArr[projectIndex].tasks.total++;
      if (taskObj.complete) {
        state.projectArr[projectIndex].tasks.completed++;
      }
    },
    removeTask: (state, action) => {
      const { projectTitle, taskTitle } = action.payload;
      const projectIndex = state.projectArr.findIndex(
        (project) => project.title === projectTitle
      );
      state.projectArr[projectIndex].tasks.tasks = state.projectArr[
        projectIndex
      ].tasks.tasks.filter((task) => task.title !== taskTitle);
      state.projectArr[projectIndex].tasks.total--;
    },
    removeProject: (state, action) => {
      const { projectTitle } = action.payload;
      state.projectArr = state.projectArr.filter(
        (project) => project.title !== projectTitle
      );
    },
  },
});

export const { addProject, addTask, removeProject, removeTask } =
  projectsSlice.actions;

export const selectProjectArr = (state) => state.projects.projectArr;
export const selectTaskArr = (state, projectTitle) =>
  state.projects.projectArr.find((project) => project.title === projectTitle)
    ?.tasks.tasks ?? [];

export default projectsSlice.reducer;
