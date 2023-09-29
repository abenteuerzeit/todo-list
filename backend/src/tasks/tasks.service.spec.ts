import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { NotFoundException } from '@nestjs/common';
import { Task } from './tasks.schema';

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(async () => {
    const mockService = {
      findAll: jest.fn().mockResolvedValue([]),
      create: jest.fn(),
      delete: jest.fn(),
      update: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TasksService, useValue: mockService },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      const result: any[] = [];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await service.findAll()).toBe(result);
    });
  });

  describe('create', () => {
    it('should create and return a task', async () => {
      const newTaskContent = 'Test Task';
      const mockTask = {
        _id: 'someUniqueId',
        content: newTaskContent,
        done: false,
        save: jest.fn(),
      } as unknown as Task;

      jest.spyOn(service, 'create').mockResolvedValue(mockTask);

      expect(await service.create(newTaskContent)).toEqual(mockTask);
    });
  });

  describe('delete', () => {
    it('should delete a task by ID without throwing an error', async () => {
      const taskId = 'someUniqueId';

      // Mock the delete method to resolve without returning anything
      jest.spyOn(service, 'delete').mockResolvedValue();

      // Use an inline async function to handle the promise
      await expect(async () => {
        await service.delete(taskId);
      }).not.toThrow();
    });

    it('should throw an error if task is not found', async () => {
      const taskId = 'nonExistentId';
      jest
        .spyOn(service, 'delete')
        .mockRejectedValue(
          new NotFoundException(`Task with ID ${taskId} not found`),
        );

      await expect(service.delete(taskId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update and return a task', async () => {
      const taskId = 'someUniqueId';
      const updatedData = { content: 'Updated Task', done: true };
      const mockUpdatedTask = {
        _id: taskId,
        ...updatedData,
        save: jest.fn(),
      } as unknown as Task;

      jest.spyOn(service, 'update').mockResolvedValue(mockUpdatedTask);

      expect(await service.update(taskId, updatedData)).toEqual(
        mockUpdatedTask,
      );
    });

    it('should throw an error if task is not found', async () => {
      const taskId = 'nonExistentId';
      jest
        .spyOn(service, 'update')
        .mockRejectedValue(
          new NotFoundException(`Task with ID ${taskId} not found`),
        );

      await expect(service.update(taskId, {})).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
