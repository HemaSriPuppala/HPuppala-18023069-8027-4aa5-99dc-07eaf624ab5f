import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createUserDto: CreateUserDto, @Req() req) {
    // If Admin is creating, they are the manager.
    // If Owner is creating, they can assign manager or be the manager.
    // For simplicity: Creator is the manager.
    const manager = req.user as User;
    return this.usersService.create(createUserDto, manager);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() req) {
    return this.usersService.findAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
