import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../core/services/user.service';
import { AuthService } from '../../core/services/auth.service';
import { User, Role } from '@antigravity-ai-assessment/data';

@Component({
  selector: 'app-team-members',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './team-members.component.html'
})
export class TeamMembersComponent implements OnInit {
  users: User[] = [];
  admins: User[] = [];
  viewers: User[] = [];
  availableUsers: User[] = [];
  showModal = false;
  createUserForm: FormGroup;
  Role = Role;

  constructor(
    private userService: UserService,
    public authService: AuthService,
    private fb: FormBuilder
  ) {
    this.createUserForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: [Role.VIEWER, Validators.required],
      userId: [''] // For selecting existing user
    });
  }

  ngOnInit() {
    this.loadTeam();
  }

  loadTeam() {
    this.userService.getAll().subscribe(users => {
      // Use the full user object from the list to ensure relations (managers) are present
      const fullCurrentUser = users.find(u => u.id === this.authService.currentUserValue?.id);
      
      if (fullCurrentUser?.role === Role.OWNER) {
        // Owner sees everyone
        this.users = users.filter(u => u.id !== fullCurrentUser.id);
      } else if (fullCurrentUser?.role === Role.ADMIN) {
        // Admin sees users who have ME as one of their managers
        this.users = users.filter(u => (u as any).managers?.some((m: User) => m.id === fullCurrentUser?.id));
        
        // Available users: Viewers who do NOT have me as manager
        this.availableUsers = users.filter(u => 
            u.role === Role.VIEWER && 
            !(u as any).managers?.some((m: User) => m.id === fullCurrentUser?.id)
        );
      } else {
        // Viewers see their Managers and Peers
        const myManagers = (fullCurrentUser as any)?.managers || [];
        const myManagerIds = myManagers.map((m: User) => m.id);
        
        if (myManagerIds.length > 0) {
             this.users = users.filter(u => {
                 // Is u one of my managers?
                 if (myManagerIds.includes(u.id)) return true;
                 
                 // Is u a peer? (Has any common manager)
                 const uManagers = (u as any).managers || [];
                 const hasOverlap = uManagers.some((m: User) => myManagerIds.includes(m.id));
                 return hasOverlap; 
             });
        } else {
            this.users = []; 
        }
      }

      // Group for display
      this.admins = this.users.filter(u => u.role === Role.ADMIN);
      this.viewers = this.users.filter(u => u.role === Role.VIEWER);
    });
  }

  openCreateModal() {
    this.showModal = true;
    this.createUserForm.reset();
    
    if (this.authService.currentUserValue?.role === Role.ADMIN) {
        // Admin logic: Add existing user to team (Viewer)
        this.createUserForm.get('userId')?.setValidators(Validators.required);
        this.createUserForm.get('username')?.clearValidators();
        this.createUserForm.get('password')?.clearValidators();
        this.createUserForm.get('role')?.clearValidators(); // Role is implied as Viewer or gathered from selected user
        
        this.createUserForm.get('userId')?.updateValueAndValidity();
        this.createUserForm.get('username')?.updateValueAndValidity();
        this.createUserForm.get('password')?.updateValueAndValidity();
        this.createUserForm.get('role')?.updateValueAndValidity();
    } else {
        // Owner logic: Create new user
        this.createUserForm.get('userId')?.clearValidators();
        this.createUserForm.get('username')?.setValidators(Validators.required);
        this.createUserForm.get('password')?.setValidators([Validators.required, Validators.minLength(6)]);
        this.createUserForm.get('role')?.setValidators(Validators.required);
        
        this.createUserForm.get('userId')?.updateValueAndValidity();
        this.createUserForm.get('username')?.updateValueAndValidity();
        this.createUserForm.get('password')?.updateValueAndValidity();
        this.createUserForm.get('role')?.updateValueAndValidity();
    }
    
    this.createUserForm.updateValueAndValidity();
  }

  closeCreateModal() {
    this.showModal = false;
    this.createUserForm.reset({ role: Role.VIEWER });
  }

  submitForm() {
    if (this.createUserForm.invalid) {
        this.createUserForm.markAllAsTouched();
        return;
    }

    if (this.createUserForm.valid) {
        const currentUser = this.authService.currentUserValue;

        if (currentUser?.role === Role.ADMIN) {
            // Add existing user to team
            const userId = this.createUserForm.get('userId')?.value;
            // Update user's manager to be me
            this.userService.update(userId, { managerId: currentUser.id }).subscribe(() => {
                this.loadTeam();
                this.closeCreateModal();
            });
        } else {
            // Create new user (Owner)
            const userData = this.createUserForm.getRawValue();
            this.userService.create(userData).subscribe(() => {
                this.loadTeam();
                this.closeCreateModal();
            });
        }
    }
  }

  deleteUser(id: string) {
    const currentUser = this.authService.currentUserValue;
    
    if (currentUser?.role === Role.ADMIN) {
        if(confirm('Are you sure you want to remove this user from your team?')) {
            // Admin just unassigns the user (sets managerId to null)
            this.userService.update(id, { managerId: null }).subscribe(() => {
                this.loadTeam();
            });
        }
    } else {    
        if(confirm('Are you sure you want to delete this user?')) {
            // Owner deletes the user permanently
            this.userService.delete(id).subscribe(() => {
                this.loadTeam();
            });
        }
    }
  }
}
