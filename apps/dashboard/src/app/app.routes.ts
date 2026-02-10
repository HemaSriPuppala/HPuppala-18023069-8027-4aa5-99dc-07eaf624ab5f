import { Route } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './core/guards/auth.guard';
import { SignupComponent } from './pages/signup/signup.component';

export const appRoutes: Route[] = [
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { 
        path: '', 
        component: DashboardComponent, 
        canActivate: [AuthGuard],
        children: [
            { path: '', loadComponent: () => import('./pages/tasks/task-board.component').then(m => m.TaskBoardComponent) },
            { path: 'team', loadComponent: () => import('./pages/team-members/team-members.component').then(m => m.TeamMembersComponent) }
        ]
    },
    { path: '**', redirectTo: '' }
];
