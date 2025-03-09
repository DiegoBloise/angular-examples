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
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
@Component({
  selector: 'app-user-list',
  imports: [MatTableModule, MatIconModule, MatButtonModule, MatCardModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent implements OnInit {
  private _snackBar = inject(MatSnackBar);

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  users: User[] = [];

  selectedUser!: User;

  displayedColumns: string[] = ['name', 'email', 'website', 'actions'];

  readonly dialog = inject(MatDialog);

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data) => (this.users = data));
  }

  newUser() {
    this.cleanSelectedUser();
    this.editUser(this.selectedUser);
  }

  showUserDetails(user: User): void {
    this.dialog.open(UserDetailDialogComponent, {
      data: user,
    });
  }

  editUser(user: User): void {
    this.selectedUser = user;

    this.dialog
      .open(EditUserDialogComponent, {
        data: user,
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.saveUser(result);
        }
      });
  }

  confirmDelete(user: User): void {
    this.dialog
      .open(ConfirmationDialogComponent, {
        data: user.name,
      })
      .afterClosed()
      .subscribe((isConfirmed) => {
        if (isConfirmed && user.id) {
          this.deleteUser(user.id);
        }
      });
  }

  saveUser(user: User) {
    user = { ...user, id: this.selectedUser?.id };

    // const request$ = user.id
    //   ? this.userService.updateUser(user)
    //   : this.userService.createUser(user);

    // request$.subscribe((responseUser) => {
    if (!user.id) {
      user.id = this.users.length + 1;
      this.users = [...this.users, user];

      this.openSnackBar('Usuário cadastrado com sucesso!');
    } else {
      this.users = this.users.map((u) => (u.id === user.id ? user : u));

      this.openSnackBar('Usuário atualizado com sucesso!');
    }
    // });

    this.cleanSelectedUser();
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id);
    this.users = this.users.filter((u) => u.id != id);

    this.openSnackBar('Usuário removido com sucesso!');
  }

  cleanSelectedUser() {
    this.selectedUser = {
      name: '',
      email: '',
      phone: '',
      website: '',
    };
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
    });
  }
}
