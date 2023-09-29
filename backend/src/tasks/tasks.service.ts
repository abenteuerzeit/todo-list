import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './tasks.schema';

@Injectable()
export class TasksService {
  constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) {}

  async findAll(): Promise<Task[]> {
    try {
      return this.taskModel.find().exec();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch tasks.');
    }
  }

  async create(content: string): Promise<Task> {
    const createdTask = new this.taskModel({ content, done: false });
    try {
      return createdTask.save();
    } catch (error) {
      throw new InternalServerErrorException('Failed to create task.');
    }
  }

  async delete(_id: string): Promise<void> {
    const result = await this.taskModel.deleteOne({ _id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Task with ID ${_id} not found`);
    }
  }

  async update(
    _id: string,
    updatedTaskData: { content?: string; done?: boolean },
  ): Promise<Task> {
    let task;
    try {
      task = await this.taskModel.findOne({ _id }).exec();
    } catch (error) {
      throw new InternalServerErrorException('Failed to update task.');
    }
    if (!task) {
      throw new NotFoundException(`Task with ID ${_id} not found`);
    }

    if (updatedTaskData.content) {
      task.content = updatedTaskData.content;
    }

    if (typeof updatedTaskData.done !== 'undefined') {
      task.done = updatedTaskData.done;
    }

    try {
      await task.save();
    } catch (error) {
      throw new InternalServerErrorException('Failed to save updated task.');
    }

    return task;
  }
}
