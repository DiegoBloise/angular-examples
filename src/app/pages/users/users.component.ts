import { Component, model, OnInit, viewChild } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user/user.service';
import { UserDetailDialogComponent } from './components/user-detail-dialog/user-detail-dialog.component';
import { UserEditDialogComponent } from './components/user-edit-dialog/user-edit-dialog.component';
import { UsersTableComponent } from './components/users-table/users-table.component';

@Component({
  selector: 'users',
  imports: [
    UserDetailDialogComponent,
    UsersTableComponent,
    UserEditDialogComponent,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  constructor(private userService: UserService) {}

  userDetailsDialog = viewChild.required(UserDetailDialogComponent);
  userEditDialog = viewChild.required(UserEditDialogComponent);

  users: User[] = [];

  newUser = {
    id: '',
    name: '',
    email: '',
    phone: '',
    website: '',
  };

  selectedUser = model<User>(this.newUser);

  ngOnInit(): void {
    this.userService
      .getUsers()
      .subscribe((data: User[]) => (this.users = data));
  }

  addNewUser() {
    this.selectedUser.set(this.newUser);
    this.userEditDialog().openDialog(this.newUser);
  }

  showDetails(user: User) {
    this.selectedUser.set(user);
    this.userDetailsDialog().openDialog();
  }

  editUser(user: User): void {
    this.selectedUser.set(user);
    this.userEditDialog().openDialog(user);
  }

  confirmDelete(user: User): void {
    // this.dialog
    //   .open(ConfirmationDialogComponent, {
    //     data: user.name,
    //   })
    //   .afterClosed()
    //   .subscribe((isConfirmed) => {
    //     if (isConfirmed && user.id) {
    //       this.deleteUser(user.id);
    //     }
    //   });
  }

  saveUser(user: User) {
    // user = { ...user, id: this.selectedUser?.id };
    // const request$ = user.id
    //   ? this.userService.updateUser(user)
    //   : this.userService.createUser(user);
    // request$.subscribe((responseUser) => {
    if (user.id) {
      this.users = this.users.map((u) => (u.id === user.id ? user : u));
    } else {
      user.id = crypto.randomUUID();
      this.users = [...this.users, user];
    }
    // });
  }

  deleteUser(user: User) {
    // this.userService.deleteUser(user);
    this.users = this.users.filter((u) => u.id != user.id);
    // this.openSnackBar('Usuário removido com sucesso!');
  }
}
