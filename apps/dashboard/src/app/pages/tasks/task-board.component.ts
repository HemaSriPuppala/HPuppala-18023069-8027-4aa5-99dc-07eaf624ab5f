import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { TaskService } from '../../core/services/task.service';
import { AuthService } from '../../core/services/auth.service';
import { Task } from '@antigravity-ai-assessment/data';
import { HasRoleDirective } from '../../core/directives/has-role.directive';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Role } from '@antigravity-ai-assessment/data';

@Component({
    selector: 'app-task-board',
    standalone: true,
    imports: [CommonModule, CdkDropList, CdkDrag, CdkDropListGroup, HasRoleDirective, ReactiveFormsModule],
    templateUrl: './task-board.component.html',
    styles: [`
    .cdk-drag-preview {
      box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2),
                  0 8px 10px 1px rgba(0, 0, 0, 0.14),
                  0 3px 14px 2px rgba(0, 0, 0, 0.12);
    }
    .cdk-drag-placeholder {
      opacity: 0;
    }
    .cdk-drag-animating {
      transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
    }
  `]
})
export class TaskBoardComponent implements OnInit {
    openTasks: Task[] = [];
    inProgressTasks: Task[] = [];
    doneTasks: Task[] = [];
    showModal = false;
    createTaskForm: FormGroup;
    Role = Role; // Expose Role enum for template

    constructor(private taskService: TaskService, public authService: AuthService, private fb: FormBuilder) {
        this.createTaskForm = this.fb.group({
            title: ['', Validators.required],
            description: ['', Validators.required]
        });
    }

    ngOnInit() {
        this.loadTasks();
    }

    loadTasks() {
        this.taskService.getAll().subscribe(tasks => {
            this.openTasks = tasks.filter(t => t.status === 'OPEN' || !t.status);
            this.inProgressTasks = tasks.filter(t => t.status === 'IN_PROGRESS');
            this.doneTasks = tasks.filter(t => t.status === 'DONE');
        });
    }

    drop(event: CdkDragDrop<Task[]>, status: string) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex,
            );
            const task = event.container.data[event.currentIndex];
            // Cast status to any if enum check is strict
            this.taskService.update(task.id, { status } as any).subscribe();
        }
    }

    openCreateModal() {
        this.showModal = true;
    }

    closeCreateModal() {
        this.showModal = false;
        this.createTaskForm.reset();
    }

    createTask() {
        if (this.createTaskForm.valid) {
            this.taskService.create(this.createTaskForm.value).subscribe(() => {
                this.loadTasks();
                this.closeCreateModal();
            });
        }
    }
}
