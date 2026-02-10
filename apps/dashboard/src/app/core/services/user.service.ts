import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '@antigravity-ai-assessment/data';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
    private apiUrl = 'http://localhost:3000/api/users';

    constructor(private http: HttpClient) { }

    getAll(): Observable<User[]> {
        return this.http.get<User[]>(this.apiUrl);
    }

    create(user: Partial<User>): Observable<User> {
        return this.http.post<User>(this.apiUrl, user);
    }

    update(id: string, updates: Partial<any>): Observable<User> {
        return this.http.patch<User>(`${this.apiUrl}/${id}`, updates);
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
