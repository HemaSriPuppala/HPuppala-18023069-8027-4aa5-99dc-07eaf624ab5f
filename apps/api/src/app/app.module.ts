import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { AuthModule } from './auth/auth.module';
import { AuditModule } from './audit/audit.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'sqlite',
        database: configService.get<string>('DATABASE_FILE', 'db.sqlite'),
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    TasksModule,
    OrganizationsModule,
    AuditModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
