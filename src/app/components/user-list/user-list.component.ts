import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';
import { UserDetailDialogComponent } from '../user-detail-dialog/user-detail-dialog.component';

@Component({
  selector: 'app-user-list',
  imports: [MatTableModule, MatIconModule, MatButtonModule, MatCardModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  selectedUser: User | null = null;

  displayedColumns: string[] = ['name', 'email', 'website', 'actions'];

  readonly dialog = inject(MatDialog);

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data) => (this.users = data));
  }

  newUser() {
    this.dialog.open(EditUserDialogComponent, {
      data: this.selectedUser,
    });
  }

  selectUser(user: User): void {
    this.dialog.open(UserDetailDialogComponent, {
      data: user,
    });
  }

  editUser(user: User): void {
    this.dialog.open(EditUserDialogComponent, {
      data: user,
    });
  }

  deleteUser(user: User): void {
    this.dialog.open(ConfirmationDialogComponent, {
      data: user.name,
    });
  }
}
