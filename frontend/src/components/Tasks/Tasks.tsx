import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

import './Tasks.css';

interface Task {
  _id: string;
  content: string;
  done: boolean;
}

const BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000';

const Tasks: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>('');
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editedContent, setEditedContent] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/tasks`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTasks(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching tasks. Please refresh the page.');
      }
    };

    fetchData();
  }, []);

  const handleAddTask = async () => {
    try {
      const response = await fetch(`${BASE_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newTask }),
      });

      if (!response.ok) {
        throw new Error('Failed to add task.');
      }

      const task = await response.json();
      setTasks((prevTasks) => [...prevTasks, task]);
      setNewTask('');
      setError(null);
    } catch (error) {
      console.error('There was an error adding the task:', error);
      setError('There was an error adding the task. Please try again.');
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      const response = await fetch(`${BASE_URL}/tasks/${taskId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete task.');
      }

      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
      setError(null);
    } catch (error) {
      console.error('There was an error deleting the task:', error);
      setError('There was an error deleting the task. Please try again.');
    }
  };

  const handleToggleDone = async (taskId: string) => {
    const task = tasks.find((t) => t._id === taskId);

    if (task) {
      try {
        const response = await fetch(`${BASE_URL}/tasks/${taskId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ done: !task.done }),
        });

        if (!response.ok) {
          throw new Error('Failed to update task.');
        }

        const updatedTask = await response.json();
        setTasks((prevTasks) =>
          prevTasks.map((t) => (t._id === updatedTask._id ? updatedTask : t))
        );
        setError(null); // Clear any previous error messages
      } catch (error) {
        console.error('There was an error updating the task:', error);
        setError('There was an error updating the task status. Please try again.');
      }
    }
  };
  
  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setEditedContent(task.content);
  };

  const handleSaveEdit = async () => {
    if (!editingTask) return;

    try {
      const response = await fetch(`${BASE_URL}/tasks/${editingTask._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: editedContent }),
      });

      if (!response.ok) {
        throw new Error('Failed to update task.');
      }

      const updatedTask = await response.json();
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t._id === updatedTask._id ? updatedTask : t))
      );

      setEditingTask(null);
      setEditedContent('');
      setError(null); // Clear any previous error messages
    } catch (error) {
      console.error('There was an error updating the task:', error);
      setError('There was an error updating the task content. Please try again.');
    }
  };


  return (
    <div className="tasks">
      {error && <div className="error">{error}</div>}
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task..."
      />
      <button onClick={handleAddTask}>Add</button>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => handleToggleDone(task._id)}
              aria-label={`Mark task "${task.content}" as ${task.done ? 'not done' : 'done'
                }`}
            />
            {editingTask && editingTask._id === task._id ? (
              <input
                type="text"
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                onBlur={handleSaveEdit}
                aria-label="Edit task content"
              />
            ) : (
              <span className={task.done ? 'done' : ''}>
                {task.content}
              </span>
            )}
            {editingTask?._id !== task._id && (
              <>
                <button onClick={() => handleEdit(task)} aria-label="Edit task">
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button onClick={() => handleDeleteTask(task._id)} aria-label="Delete task">
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
