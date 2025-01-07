import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createTask, updateTask } from '../redux/taskSlice';
import { Form, Button } from 'react-bootstrap';

const AddTask = ({ taskToEdit, setTaskToEdit }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    completed: false,
  });

  useEffect(() => {
    if (taskToEdit) {
      setFormData({
        title: taskToEdit.title || '',
        description: taskToEdit.description || '',
        completed: taskToEdit.completed || false,
      });
    } else {
      setFormData({
        title: '',
        description: '',
        completed: false,
      });
    }
  }, [taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskToEdit) {
      dispatch(updateTask({ id: taskToEdit._id, taskData: formData }));
    } else {
      dispatch(createTask(formData));
    }
    setFormData({ title: '', description: '', completed: false });
    setTaskToEdit(null);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter task title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter task description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Check
          type="checkbox"
          label="Completed"
          checked={formData.completed}
          onChange={(e) => setFormData({ ...formData, completed: e.target.checked })}
        />
      </Form.Group>
      <Button type="submit">{taskToEdit ? 'Update' : 'Add'} Task</Button>
    </Form>
  );
};

export default AddTask;
