import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Tasks from './Tasks';

global.fetch = jest.fn();

describe('Tasks component', () => {
    beforeEach(() => {
        (global.fetch as jest.Mock).mockClear();
    });

    it('renders without errors', async () => {

// Mock the fetch call for initial data retrieval
(global.fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    json: async () => ([{ _id: 'test_task_1', content: 'Test Task 1', done: false }]),
});

        render(<Tasks />);

        const taskInput = screen.getByPlaceholderText('Add a new task...');
        const addButton = screen.getByText('Add');
        const taskList = screen.getByRole('list');

        expect(taskInput).toBeInTheDocument();
        expect(addButton).toBeInTheDocument();
        expect(taskList).toBeInTheDocument();
    });

    it('adds a new task', async () => {

// Mock the fetch call for adding a task
(global.fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    json: async () => ({ _id: 'new_task_id', content: 'New Task', done: false }),
});

        
        render(<Tasks />);

        // Wait for tasks to be loaded
        await screen.findByText('Test Task 1');

        // Simulate typing a task name in the input box
        const taskInput = screen.getByPlaceholderText('Add a new task...');
        fireEvent.change(taskInput, { target: { value: 'New Task' } });

        // Simulate clicking the "Add" button
        const addButton = screen.getByText('Add');
        fireEvent.click(addButton);

        // Check if the new task appears in the task list
        const newTask = await screen.findByText('New Task');
        expect(newTask).toBeInTheDocument();
    });

    it('removes a task', async () => {

// Mock the fetch call for removing a task
(global.fetch as jest.Mock).mockResolvedValueOnce({ ok: true });

            
        render(<Tasks />);
    
        // Wait for tasks to be loaded
        const taskToDelete = await screen.findByText('Test Task 1');
    
        // Simulate clicking the "Delete" button for one of the tasks
        const deleteButton = screen.getByLabelText(`Delete ${taskToDelete.textContent}`);
        fireEvent.click(deleteButton);
    
        // Check if the task is removed from the task list
        await waitFor(() => {
            expect(screen.queryByText('Test Task 1')).not.toBeInTheDocument();
        });
    });
    
    it('marks a task as completed', async () => {
        // Mock the fetch call for updating a task
        (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: true });
    
        render(<Tasks />);
    
        // Wait for tasks to be loaded
        const taskToComplete = await screen.findByText('Test Task 1');
    
        // Simulate clicking the checkbox for one of the tasks
        const checkbox = screen.getByLabelText(`Complete ${taskToComplete.textContent}`);
        fireEvent.click(checkbox);
    
        // Check if the appearance of the task changes to indicate it's completed
        // For simplicity, let's check if it has a "completed" attribute
        await waitFor(() => {
            expect(checkbox).toHaveAttribute('completed');
        });
    });
    
});
