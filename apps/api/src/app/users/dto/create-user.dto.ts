import { IsString, IsEnum, IsOptional, MinLength } from 'class-validator';
import { Role } from '@antigravity-ai-assessment/data';

export class CreateUserDto {
    @IsString()
    @MinLength(4)
    username: string;

    @IsString()
    @MinLength(6)
    password: string;

    @IsEnum(Role)
    @IsOptional()
    role?: Role;
}
