import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { User } from '../users/entities/user.entity';
import { Role } from '@antigravity-ai-assessment/data';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) { }

  create(createTaskDto: CreateTaskDto, user: User) {
    const task = this.tasksRepository.create({
      ...createTaskDto,
      user,
    });
    return this.tasksRepository.save(task);
  }

  findAll(user: User) {
    return this.tasksRepository.find({
      where: {
        user: {
          organization: {
            id: user.organization?.id, // Filter by organization
          },
        },
      },
      relations: ['user'], // Eager load user for display
    });
  }

  async findOne(id: string, user: User) {
    const task = await this.tasksRepository.findOne({
      where: { id },
      relations: ['user', 'user.organization'],
    });
    if (!task) throw new NotFoundException('Task not found');

    // Check organization access
    if (task.user.organization.id !== user.organization.id && user.role !== Role.OWNER) {
      throw new ForbiddenException('Access denied');
    }
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto, user: User) {
    const task = await this.findOne(id, user); // Checks org access

    // RBAC: Viewer cannot edit
    if (user.role === Role.VIEWER) throw new ForbiddenException('Viewers cannot edit tasks');

    // Ownership check: Admin/Owner can edit any, Standard user can only edit own?
    // Assuming only Owner/Admin can edit others' tasks.
    if (task.user.id !== user.id && user.role !== Role.ADMIN && user.role !== Role.OWNER) {
      throw new ForbiddenException('You can only edit your own tasks');
    }

    Object.assign(task, updateTaskDto);
    return this.tasksRepository.save(task);
  }

  async remove(id: string, user: User) {
    const task = await this.findOne(id, user);
    if (user.role === Role.VIEWER) throw new ForbiddenException('Viewers cannot delete tasks');

    if (task.user.id !== user.id && user.role !== Role.ADMIN && user.role !== Role.OWNER) {
      throw new ForbiddenException('You can only delete your own tasks');
    }
    return this.tasksRepository.remove(task);
  }
}
