import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { UserDetailDialogComponent } from '../user-detail-dialog/user-detail-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-list',
  imports: [MatTableModule, MatIconModule, MatButtonModule],
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

  selectUser(user: User): void {
    this.selectedUser = user;
    this.openDialog();
  }

  editUser(user: User): void {
    console.log(user);
  }

  deleteUser(user: User): void {
    console.log(user);
  }

  openDialog() {
    this.dialog.open(UserDetailDialogComponent, {
      data: this.selectedUser,
    });
  }
}
