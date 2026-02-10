import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { User, LoginResponse } from '@antigravity-ai-assessment/data';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private currentUserSubject: BehaviorSubject<User | null>;
    public currentUser: Observable<User | null>;

    constructor(private http: HttpClient, private router: Router) {
        const storedUser = localStorage.getItem('currentUser');
        this.currentUserSubject = new BehaviorSubject<User | null>(storedUser ? JSON.parse(storedUser) : null);
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User | null {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string): Observable<User> {
        return this.http.post<LoginResponse>(`http://localhost:3000/api/auth/login`, { username, password })
            .pipe(map(response => {
                // Decode token to get user details
                const token = response.access_token;
                const decodedToken: any = jwtDecode(token);

                // Construct User object from token payload (sub is id)
                const user: User = {
                    id: decodedToken.sub,
                    username: decodedToken.username,
                    role: decodedToken.role,
                    // Organization is missing in payload for now, might need another fetch or include in token
                };

                // Store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                localStorage.setItem('token', token);

                this.currentUserSubject.next(user);
                return user;
            }));
    }

    register(user: any): Observable<User> {
        return this.http.post<LoginResponse>(`http://localhost:3000/api/auth/register`, user)
            .pipe(map(response => {
                const token = response.access_token;
                const decodedToken: any = jwtDecode(token);
                
                const userObj: User = {
                    id: decodedToken.sub,
                    username: decodedToken.username,
                    role: decodedToken.role,
                };
                
                localStorage.setItem('currentUser', JSON.stringify(userObj));
                localStorage.setItem('token', token);
                this.currentUserSubject.next(userObj);
                return userObj;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
        this.currentUserSubject.next(null);
        this.router.navigate(['/login']);
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    isAuthenticated(): boolean {
        return !!this.getToken();
    }
}
