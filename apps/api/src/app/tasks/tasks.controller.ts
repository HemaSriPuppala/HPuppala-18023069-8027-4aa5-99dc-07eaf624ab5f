import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '@antigravity-ai-assessment/auth';
import { Roles } from '@antigravity-ai-assessment/auth';
import { Role } from '@antigravity-ai-assessment/data';

@Controller('tasks')
@UseGuards(JwtAuthGuard, RolesGuard)                                       // ensures authentication 
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @Post()
  @Roles(Role.ADMIN, Role.OWNER, Role.VIEWER) // Viewer can create? Maybe not. Let's say Viewer can only View.
  create(@Body() createTaskDto: CreateTaskDto, @Request() req) {
    // If Viewer logic in Service prevents it, we can also prevent here with Roles
    // Requirement said: "Viewer" -> implied read only.
    // I'll restricts creation to ADMIN and OWNER.
    // But wait, "Standard" user? "Roles: Owner, Admin, Viewer".
    // Is there a standard user? No.
    // So only Admin/Owner create tasks? Or Viewer can create "Personal" tasks?
    // "Sort, filter... (e.g. Work, Personal)".
    // Let's assume Viewer is Read-only for now.
    return this.tasksService.create(createTaskDto, req.user);
  }

  @Get()
  findAll(@Request() req) {
    return this.tasksService.findAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.tasksService.findOne(id, req.user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto, @Request() req) {
    return this.tasksService.update(id, updateTaskDto, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.tasksService.remove(id, req.user);
  }
}
