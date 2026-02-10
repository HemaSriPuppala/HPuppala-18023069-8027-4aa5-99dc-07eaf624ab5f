import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Organization } from '../../organizations/entities/organization.entity';
import { Role } from '@antigravity-ai-assessment/data'; // Adjust import if needed, or use local enum
import { Task } from '../../tasks/entities/task.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @Column({ type: 'simple-enum', enum: Role, default: Role.VIEWER })
    role: Role;

    @ManyToOne(() => Organization, (org) => org.users, { nullable: true })
    organization: Organization;

    @OneToMany(() => Task, (task) => task.user)
    tasks: Task[];

    @ManyToMany(() => User, (user) => user.subordinates)
    @JoinTable({
        name: 'user_managers',
        joinColumn: { name: 'subordinateId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'managerId', referencedColumnName: 'id' }
    })
    managers: User[];

    @ManyToMany(() => User, (user) => user.managers)
    subordinates: User[];
}
