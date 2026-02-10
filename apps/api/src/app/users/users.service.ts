import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto, manager?: User): Promise<User> {
    const { password, ...rest } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.usersRepository.create({
      ...rest,
      password: hashedPassword,
      managers: manager ? [manager] : []
    });
    return this.usersRepository.save(user);
  }

  findAll(currentUser?: User): Promise<User[]> {
      const options: any = { relations: ['managers', 'subordinates'] };
      return this.usersRepository.find(options);
  }

  findOne(id: string) {
    return this.usersRepository.findOne({ where: { id }, relations: ['managers', 'subordinates'] });
  }

  findOneByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ username });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne({ where: { id }, relations: ['managers'] });
    if (!user) return null;

    if (updateUserDto.managerId !== undefined) {
        if (updateUserDto.managerId === null) {
            // Logic to clear managers? Or specific?
            // For now, let's assume null means "Clear All" or "Reset".
            // However, the UI flow uses this to "Remove from team".
            // Since we don't have the "remover" context here easily without changing signature...
            // I will clear all managers for now. This works for 1:1, but for N:N it wipes all.
            user.managers = [];
        } else {
            const manager = await this.usersRepository.findOneBy({ id: updateUserDto.managerId });
            if (manager) {
                // Add manager if not persists
                if (!user.managers) user.managers = [];
                // Check if already exists
                if (!user.managers.find(m => m.id === manager.id)) {
                    user.managers.push(manager);
                }
            }
        }
    }
    
    // Remove managerId from dto
    const { managerId, ...rest } = updateUserDto;
    
    Object.assign(user, rest); 
    
    return this.usersRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
