import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-signup',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    template: `
<div class="min-h-screen flex items-center justify-center bg-slate-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
    <!-- Background Decor -->
    <div class="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-500/20 rounded-full blur-[120px]"></div>
    <div class="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/20 rounded-full blur-[120px]"></div>

    <div class="max-w-md w-full space-y-8 relative z-10 bg-slate-800/50 p-8 rounded-2xl border border-slate-700 backdrop-blur-xl shadow-2xl">
        <div>
            <div class="mx-auto h-12 w-12 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-xl shadow-lg shadow-indigo-500/30 flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
            </div>
            <h2 class="mt-6 text-center text-3xl font-extrabold text-white">
                Create new account
            </h2>
            <p class="mt-2 text-center text-sm text-slate-400">
                Or <a routerLink="/login" class="font-medium text-indigo-400 hover:text-indigo-300 transition-colors">sign in to existing account</a>
            </p>
        </div>
        <form class="mt-8 space-y-6" [formGroup]="signupForm" (ngSubmit)="onSubmit()">
            <div class="rounded-md shadow-sm space-y-4">
                <div>
                    <label for="username" class="block text-sm font-medium text-slate-300 mb-1">Username</label>
                    <input formControlName="username" id="username" name="username" type="text" required class="appearance-none relative block w-full px-3 py-3 border border-slate-600 placeholder-slate-500 text-white bg-slate-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-all" placeholder="Choose a username">
                    <div *ngIf="submitted && f['username'].errors" class="text-red-400 text-xs mt-1 ml-1">
                        <div *ngIf="f['username'].errors['required']">Username is required</div>
                        <div *ngIf="f['username'].errors['minlength']">Username must be at least 4 characters</div>
                    </div>
                </div>
                <div>
                    <label for="password" class="block text-sm font-medium text-slate-300 mb-1">Password</label>
                    <input formControlName="password" id="password" name="password" type="password" required class="appearance-none relative block w-full px-3 py-3 border border-slate-600 placeholder-slate-500 text-white bg-slate-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-all" placeholder="Create a password">
                    <div *ngIf="submitted && f['password'].errors" class="text-red-400 text-xs mt-1 ml-1">
                        <div *ngIf="f['password'].errors['required']">Password is required</div>
                        <div *ngIf="f['password'].errors['minlength']">Password must be at least 6 characters</div>
                    </div>
                </div>
                 <div>
                    <label for="role" class="block text-sm font-medium text-slate-300 mb-1">Role</label>
                    <select formControlName="role" id="role" name="role" class="appearance-none relative block w-full px-3 py-3 border border-slate-600 placeholder-slate-500 text-white bg-slate-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-all">
                        <option value="VIEWER">Viewer (Read-only)</option>
                        <option value="ADMIN">Admin (Full Access)</option>
                        <option value="OWNER">Owner (Manage Org)</option>
                    </select>
                </div>
            </div>

            <div *ngIf="error" class="text-red-400 text-sm text-center bg-red-900/20 p-2 rounded-lg border border-red-900/50">
                {{error}}
            </div>

            <div>
                <button [disabled]="loading" type="submit" class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-slate-900 transition-all shadow-lg hover:shadow-indigo-500/30 disabled:opacity-50 disabled:cursor-not-allowed">
                    <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                        <svg *ngIf="!loading" class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
                        <svg *ngIf="loading" class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    </span>
                    Sign up
                </button>
            </div>
        </form>
    </div>
</div>
    `
})
export class SignupComponent implements OnInit {
    signupForm!: FormGroup;
    loading = false;
    submitted = false;
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthService
    ) { 
        if (this.authenticationService.currentUserValue) { 
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.signupForm = this.formBuilder.group({
            username: ['', [Validators.required, Validators.minLength(4)]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            role: ['VIEWER', Validators.required]
        });
    }

    get f() { return this.signupForm.controls; }

    onSubmit() {
        this.submitted = true;

        if (this.signupForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.register(this.signupForm.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.router.navigate(['/']);
                },
                error: error => {
                    this.error = error.error?.message || error.statusText || 'Registration failed';
                    this.loading = false;
                }
            });
    }
}
