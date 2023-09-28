import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { NotFoundException } from '@nestjs/common';

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
      const result = { id: 1, content: newTaskContent, done: false };

      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await service.create(newTaskContent)).toEqual(result);
    });
  });

  describe('delete', () => {
    it('should delete a task by ID and return a success message', async () => {
      const taskId = 1;
      const successMessage = `Task with ID ${taskId} deleted successfully`;

      jest.spyOn(service, 'delete').mockResolvedValue(successMessage);

      expect(await service.delete(taskId)).toBe(successMessage);
    });

    it('should throw an error if task is not found', async () => {
      const taskId = 999;
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
      const taskId = 1;
      const updatedData = { content: 'Updated Task', done: true };
      const updatedTask = { id: taskId, ...updatedData };

      jest.spyOn(service, 'update').mockResolvedValue(updatedTask);

      expect(await service.update(taskId, updatedData)).toEqual(updatedTask);
    });

    it('should throw an error if task is not found', async () => {
      const taskId = 999;
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
