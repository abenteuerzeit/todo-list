import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

import './Tasks.css';

interface Task {
  id: number;
  content: string;
  done: boolean;
}

const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:3000";

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>('');

  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editedContent, setEditedContent] = useState<string>('');


  useEffect(() => {
    fetch(`${BASE_URL}/tasks`)
      .then(response => response.json())
      .then(data => setTasks(data));
  }, []);

  const handleAddTask = () => {
    fetch(`${BASE_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: newTask }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to add task.');
        }
        return response.json();
      })
      .then(task => {
        setTasks(prevTasks => [...prevTasks, task]);
        setNewTask('');
      })
      .catch(error => {
        console.error("There was an error adding the task:", error);
      });
  };

  const handleDeleteTask = (taskId: number) => {
    fetch(`${BASE_URL}/tasks/${taskId}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete task.');
        }
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
      })
      .catch(error => {
        console.error("There was an error deleting the task:", error);
      });
  };

  const handleToggleDone = (taskId: number) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      fetch(`${BASE_URL}/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ done: !task.done }),
      })
        .then(response => response.json())
        .then(updatedTask => {
          setTasks(prevTasks => prevTasks.map(task =>
            task.id === updatedTask.id ? updatedTask : task
          ));
        })
        .catch(error => {
          console.error("There was an error updating the task:", error);
        });
    }
  };

  const handleEdit = (taskId: number, content: string) => {
    setEditingTaskId(taskId);
    setEditedContent(content);
  };

  const handleSaveEdit = (taskId: number) => {
    fetch(`${BASE_URL}/tasks/${taskId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: editedContent }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update task.');
        }
        return response.json();
      })
      .then(updatedTask => {
        setTasks(prevTasks => prevTasks.map(task =>
          task.id === updatedTask.id ? updatedTask : task
        ));
        setEditingTaskId(null);
        setEditedContent('');
      })
      .catch(error => {
        console.error("There was an error updating the task:", error);
      });
  };

  return (
    <div className="tasks">
      <input
        type="text"
        value={newTask}
        onChange={e => setNewTask(e.target.value)}
        placeholder="Add a new task..."
      />
      <button onClick={handleAddTask}>Add</button>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => handleToggleDone(task.id)}
              aria-label={`Mark task "${task.content}" as ${task.done ? 'not done' : 'done'}`}
            />
            {editingTaskId === task.id ? (
              <input
                type="text"
                value={editedContent}
                onChange={e => setEditedContent(e.target.value)}
                onBlur={() => handleSaveEdit(task.id)}
                aria-label="Edit task content"
              />
            ) : (
              <span className={task.done ? "done" : ""}>
                {task.content}
              </span>
            )}
            {editingTaskId !== task.id && (
              <>
                <button onClick={() => handleEdit(task.id, task.content)} aria-label="Edit task">
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button onClick={() => handleDeleteTask(task.id)} aria-label="Delete task">
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
