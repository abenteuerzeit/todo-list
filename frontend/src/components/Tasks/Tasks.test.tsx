import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react'; // Make sure to import act
import userEvent from '@testing-library/user-event';
import Tasks from './Tasks';

// Mocking the fetch call
global.fetch = jest.fn();

describe('<Tasks />', () => {
    beforeEach(() => {
        (global.fetch as jest.Mock).mockClear();
    });

    it('adds a new task', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValue({ _id: 'testId', content: 'Test task', done: false })
        });

        render(<Tasks />);
        const input = screen.getByPlaceholderText('Add a new task...');
        const addButton = screen.getByText('Add');

        userEvent.type(input, 'Test task');
        fireEvent.click(addButton);

        await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));
        expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('/tasks'), expect.objectContaining({
            method: 'POST',
        }));
    });

    it('deletes a task', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValue([{ _id: 'testId', content: 'Test task', done: false }])
        }).mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValue({})
        });

        render(<Tasks />);
        await screen.findByLabelText('Delete task');
        const deleteButton = screen.getByLabelText('Delete task');

        fireEvent.click(deleteButton);

        await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));
        expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('/tasks/testId'), expect.objectContaining({
            method: 'DELETE',
        }));
    });

    it('marks a task as completed', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValue([{ _id: 'testId', content: 'Test task', done: false }])
        }).mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValue({})
        });

        render(<Tasks />);
        await screen.findByLabelText(/^Mark task "Test task" as/);
        const checkbox = screen.getByLabelText(/^Mark task "Test task" as/);

        fireEvent.click(checkbox);

        await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));
        expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('/tasks/testId'), expect.objectContaining({
            method: 'PATCH',
        }));
    });
});
