import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './redux/taskSlice';

const store = configureStore({
  reducer: {
    tasks: tasksReducer, // Register the tasks slice
  },
});

export default store;
