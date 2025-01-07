import { useState } from 'react';
import './App.css';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import { Container } from 'react-bootstrap';
function App() {
  const [taskToEdit, setTaskToEdit] = useState(null);
  return (
    <Container>
      <h1 className='mt-4 text-center'>Task Manager</h1>
      <AddTask taskToEdit={taskToEdit} setTaskToEdit={setTaskToEdit} />
      <TaskList onEdit={setTaskToEdit} />
    </Container>
  );
}

export default App;
