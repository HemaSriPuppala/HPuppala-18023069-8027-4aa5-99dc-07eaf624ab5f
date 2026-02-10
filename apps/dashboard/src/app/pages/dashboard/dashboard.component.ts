import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { TaskBoardComponent } from '../tasks/task-board.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TaskBoardComponent],
  template: `
    <div class="flex h-screen bg-gray-100 font-sans">
      <!-- Sidebar -->
      <div class="h-full bg-slate-900 border-r border-slate-800 flex flex-col w-64 transition-all duration-300 shadow-xl z-20">
        <!-- Brand -->
        <div class="p-6 border-b border-slate-800 flex items-center space-x-3">
             <div class="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/30"></div>
             <h2 class="text-xl font-bold tracking-tight text-white">Antigravity</h2>
        </div>
        
        <!-- Navigation -->
        <nav class="flex-1 p-4 space-y-1 overflow-y-auto">
          <p class="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Main</p>
          
          <a href="#" class="flex items-center space-x-3 px-4 py-3 bg-indigo-600/10 text-indigo-400 rounded-xl border border-indigo-600/20 shadow-sm relative group">
            <span class="absolute left-0 w-1 h-6 bg-indigo-500 rounded-r-full"></span>
            <svg class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
            <span class="font-bold">Task Board</span>
          </a>

          <a href="#" class="flex items-center space-x-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all group">
            <svg class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
             <span class="font-medium">Team Members</span>
          </a>

          <a href="#" class="flex items-center space-x-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all group">
            <svg class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
             <span class="font-medium">Analytics</span>
          </a>
        </nav>
        
        <!-- User Profile -->
        <div class="p-4 border-t border-slate-800 bg-slate-900/50">
            <div class="flex items-center space-x-3 p-2 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer group">
                <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 to-orange-400 flex items-center justify-center font-bold text-white shadow-md ring-2 ring-slate-800 group-hover:ring-slate-700 transition">
                    {{ (authService.currentUser | async)?.username?.charAt(0)?.toUpperCase() || 'U' }}
                </div>
                <div class="flex-1 overflow-hidden">
                    <p class="text-sm font-bold text-white truncate">{{ (authService.currentUser | async)?.username || 'User' }}</p>
                    <p class="text-xs text-slate-400 truncate">{{ (authService.currentUser | async)?.role || 'Role' }}</p>
                </div>
                <button (click)="logout()" class="text-slate-500 hover:text-red-400 p-2 rounded-full hover:bg-slate-700 transition-colors" title="Logout">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                </button>
            </div>
        </div>
      </div>

      <!-- Main Content Area -->
      <div class="flex-1 flex flex-col overflow-hidden relative bg-slate-50">
      
        <!-- Top Bar -->
        <header class="flex justify-between items-center py-4 px-8 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-10 shadow-sm">
          <div class="flex items-center space-x-4">
             <h1 class="text-2xl font-bold text-slate-800">Project Overview</h1>
             <span class="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full border border-green-200">Active Sprint</span>
          </div>
          
          <div class="flex items-center space-x-6">
             <!-- Search -->
             <div class="relative hidden md:block">
                <input type="text" placeholder="Search tasks..." class="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all w-64">
                <svg class="w-4 h-4 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
             </div>
             
             <!-- Notifications -->
             <button class="relative text-slate-400 hover:text-indigo-600 transition-colors">
                 <span class="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                 <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
             </button>
          </div>
        </header>

        <!-- Content Body -->
        <main class="flex-1 overflow-x-hidden overflow-y-auto relative p-0">
             <!-- Background Orbs -->
             <div class="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-30">
                <div class="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-purple-300 rounded-full blur-[100px]"></div>
                <div class="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-indigo-300 rounded-full blur-[100px]"></div>
             </div>
             
             <div class="relative z-10 h-full p-2">
               <app-task-board></app-task-board>
             </div>
        </main>
      </div>
    </div>
  `,
  styles: []
})
export class DashboardComponent {
  constructor(public authService: AuthService) { }

  logout() {
    this.authService.logout();
  }
}
