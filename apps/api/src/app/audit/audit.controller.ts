import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuditService } from './audit.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard, Roles } from '@antigravity-ai-assessment/auth';
import { Role } from '@antigravity-ai-assessment/data';

@Controller('audit-log')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AuditController {
    constructor(private readonly auditService: AuditService) { }

    @Get()
    @Roles(Role.ADMIN, Role.OWNER)
    findAll() {
        return this.auditService.getLogs();
    }
}
