import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class AuditService {
    private logFile = path.join(process.cwd(), 'access.log');

    logAccess(user: string, action: string, resource: string, status: string) {
        const timestamp = new Date().toISOString();
        const logEntry = `[${timestamp}] User: ${user} | Action: ${action} | Resource: ${resource} | Status: ${status}\n`;
        fs.appendFile(this.logFile, logEntry, (err) => {
            if (err) console.error('Failed to write to audit log', err);
        });
    }

    async getLogs(): Promise<string[]> {
        try {
            if (!fs.existsSync(this.logFile)) return [];
            const data = await fs.promises.readFile(this.logFile, 'utf8');
            return data.split('\n').filter((line) => line.trim() !== '').reverse();
        } catch (error) {
            console.error(error);
            return [];
        }
    }
}
