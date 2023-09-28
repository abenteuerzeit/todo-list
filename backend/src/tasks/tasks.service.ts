import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './models/task.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  private idCounter = 1;

  async findAll(): Promise<Task[]> {
    return Promise.resolve(this.tasks);
  }

  async create(content: string): Promise<Task> {
    const newTask: Task = {
      id: this.idCounter++,
      content: content,
      done: false,
    };
    this.tasks.push(newTask);
    return Promise.resolve(newTask);
  }

  async delete(id: number): Promise<string> {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    this.tasks.splice(taskIndex, 1);
    return Promise.resolve(`Task with ID ${id} deleted successfully`);
  }

  async update(
    id: number,
    updatedTaskData: { content?: string; done?: boolean },
  ): Promise<Task> {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    if (updatedTaskData.content) {
      task.content = updatedTaskData.content;
    }

    if (typeof updatedTaskData.done !== 'undefined') {
      task.done = updatedTaskData.done;
    }

    return Promise.resolve(task);
  }
}
