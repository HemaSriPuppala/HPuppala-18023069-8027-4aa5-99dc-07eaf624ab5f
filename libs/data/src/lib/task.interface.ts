import { User } from './user.interface';

export interface Task {
    id: string;
    title: string;
    description: string;
    status: 'OPEN' | 'IN_PROGRESS' | 'DONE';
    user?: User;
}

export interface CreateTaskDto {
    title: string;
    description: string;
    status?: string;
}

export interface UpdateTaskDto {
    title?: string;
    description?: string;
    status?: string;
}
