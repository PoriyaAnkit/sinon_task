import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks, deleteTask } from '../redux/taskSlice';
import { Button, Table } from 'react-bootstrap';
import Pagination from './Pagination';


const TaskList = ({ onEdit }) => {
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const [ currentPage, setCurrentPage ] = useState( 1 );
  const tasksPerPage = 5;

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(id));
    }
  };

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice( indexOfFirstTask, indexOfLastTask );

  const totalPages = Math.ceil( tasks.length / tasksPerPage );

  const handlePrevious = () => {
    if ( currentPage > 1 ) {
      setCurrentPage( ( prevPage ) => prevPage - 1 );
    }
  };

  const handleNext = () => {
    if ( currentPage < totalPages ) {
      setCurrentPage( ( prevPage ) => prevPage + 1 );
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2 className='my-4 text-center'>Task List</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Description</th>
            <th>Completed</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentTasks?.map((task, index) => (
            <tr key={task._id}>
              <td>{indexOfFirstTask + index + 1}</td>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.completed ? 'Yes' : 'No'}</td>
              <td>
                <Button variant="warning" onClick={() => onEdit(task)}>Edit</Button>{' '}
                <Button variant="danger" onClick={() => handleDelete(task._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination
        handlePrevious={handlePrevious}
        currentPage={currentPage}
        totalPages={totalPages}
        handleNext={handleNext}
      />
    </div>
  );
};

export default TaskList;
