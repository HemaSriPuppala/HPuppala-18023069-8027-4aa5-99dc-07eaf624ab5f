import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { OrganizationsService } from './organizations/organizations.service';
import { Role } from '@antigravity-ai-assessment/data';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(
    private usersService: UsersService,
    private organizationsService: OrganizationsService
  ) { }

  async onApplicationBootstrap() {
    console.log('Checking for existing users...');
    const users = await this.usersService.findAll();
    if (users.length === 0) {
      console.log('No users found. Seeding initial data...');

      let org = null;
      const orgs = await this.organizationsService.findAll();
      if (orgs.length === 0) {
        console.log('Creating organization "Antigravity"...');
        org = await this.organizationsService.create({ name: 'Antigravity' });
      } else {
        org = orgs[0];
      }

      console.log(`Seeding admin user in organization: ${org.name}`);
      await this.usersService.create({
        username: 'admin',
        password: 'password',
        role: Role.ADMIN,
        organization: org
      } as any);

      console.log('Seeding demo user...');
      await this.usersService.create({
        username: 'demo',
        password: 'password',
        role: Role.VIEWER,
        organization: org
      } as any);

      console.log('Data seeded successfully.');
      console.log('Admin: admin / password');
      console.log('User: demo / password');
    } else {
      console.log('Users already exist. Skipping seed.');
    }
  }

  getData(): { message: string } {
    return { message: 'Hello API' };
  }
}
