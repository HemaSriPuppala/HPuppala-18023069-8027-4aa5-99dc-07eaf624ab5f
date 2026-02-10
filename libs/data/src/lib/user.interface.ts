import { Role } from './role.enum';

export interface User {
    id: string;
    username: string;
    role: Role;
    organization?: {
        id: string;
        name: string;
    };
}

export interface LoginResponse {
    access_token: string;
}
