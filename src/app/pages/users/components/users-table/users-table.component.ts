import { Component, input, output } from '@angular/core';
import { User } from '../../../../models/user.model';

@Component({
  selector: 'users-table',
  imports: [],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.css',
})
export class UsersTableComponent {
  users = input.required<User[]>();

  onEditUser = output<User>();
  onDeleteUser = output<User>();
  onUserDetails = output<User>();
}
