import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../core/services/task.service';
import { UserService } from '../../core/services/user.service';
import { AuthService } from '../../core/services/auth.service';
import { Role, Task, User } from '@antigravity-ai-assessment/data';

interface MemberStat {
    name: string;
    total: number;
    done: number;
    inProgress: number;
    open: number;
}

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './analytics.component.html'
})
export class AnalyticsComponent implements OnInit {
  Role = Role;
  role: Role = Role.VIEWER;
  currentUser: User | null = null;

  // Metrics
  totalTasks = 0;
  completionRate = 0;
  inProgressTasks = 0;
  doneTasks = 0;
  openTasks = 0;
  
  // Role Specific
  totalUsers = 0;
  teamMembersCount = 0;
  
  // Charts Data
  memberPerformance: MemberStat[] = [];
  maxTasks = 1; // For bar chart scaling

  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private authService: AuthService
  ) {
      this.currentUser = this.authService.currentUserValue;
      if (this.currentUser) {
          this.role = this.currentUser.role;
      }
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    // 1. Load Tasks (Filtered by backend for Admin/Viewer/Owner)
    this.taskService.getAll().subscribe(tasks => {
        this.processTaskMetrics(tasks);
        
        // 2. Load Users for detailed breakdown
        if (this.role === Role.OWNER || this.role === Role.ADMIN) {
            this.userService.getAll().subscribe(users => {
                this.processUserMetrics(users, tasks);
            });
        }
    });
  }

  processTaskMetrics(tasks: Task[]) {
      this.totalTasks = tasks.length || 0;
      this.doneTasks = tasks.filter(t => t.status === 'DONE').length;
      this.inProgressTasks = tasks.filter(t => t.status === 'IN_PROGRESS').length;
      this.openTasks = tasks.filter(t => t.status === 'OPEN' || !t.status).length;
      
      this.completionRate = this.totalTasks > 0 ? Math.round((this.doneTasks / this.totalTasks) * 100) : 0;
  }

  processUserMetrics(users: User[], tasks: Task[]) {
      if (this.role === Role.OWNER) {
          this.totalUsers = users.length;
          // Owner sees performance of everyone? Or top performers?
          // Let's show aggregated by user
          this.memberPerformance = users.map(u => {
              const userTasks = tasks.filter(t => t.user?.id === u.id);
              return {
                  name: u.username,
                  total: userTasks.length,
                  done: userTasks.filter(t => t.status === 'DONE').length,
                  inProgress: userTasks.filter(t => t.status === 'IN_PROGRESS').length,
                  open: userTasks.filter(t => t.status === 'OPEN').length
              };
          }).sort((a, b) => b.total - a.total).slice(0, 10); // Top 10 by volume
          
      } else if (this.role === Role.ADMIN) {
          // Admin sees their team
          // Filter users to only my team
          const team = users.filter(u => u.id === this.currentUser?.id || (u as any).managers?.some((m: User) => m.id === this.currentUser?.id));
          this.teamMembersCount = team.length;
          
          this.memberPerformance = team.map(u => {
              const userTasks = tasks.filter(t => t.user?.id === u.id);
              return {
                  name: u.username,
                  total: userTasks.length,
                  done: userTasks.filter(t => t.status === 'DONE').length,
                  inProgress: userTasks.filter(t => t.status === 'IN_PROGRESS').length,
                  open: userTasks.filter(t => t.status === 'OPEN').length
              };
          }).sort((a, b) => b.total - a.total);
      }
      
      // Calculate max for bar scaling
      this.maxTasks = Math.max(...this.memberPerformance.map(m => m.total), 1);
  }

  // Helper for Donut Gradient
  getConicGradient() {
      // Order: Done (Emerald), InProgress (Blue), Open (Slate)
      const doneDeg = (this.doneTasks / this.totalTasks) * 360 || 0;
      const progressDeg = (this.inProgressTasks / this.totalTasks) * 360 || 0;
      
      const p1 = doneDeg;
      const p2 = doneDeg + progressDeg;
      
      // Colors: Emerald-500 (#10b981), Blue-500 (#3b82f6), Slate-500 (#64748b)
      // Using literal colors for simplicity in style binding or CSS variable references
      return `conic-gradient(
          #10b981 0deg ${p1}deg, 
          #3b82f6 ${p1}deg ${p2}deg, 
          #64748b ${p2}deg 360deg
      )`;
  }
  
  getPercent(val: number) {
      if (!this.totalTasks) return 0;
      return Math.round((val / this.totalTasks) * 100);
  }
}
