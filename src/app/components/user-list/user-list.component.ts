import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserDetailComponent } from '../user-detail/user-detail.component';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-list',
  imports: [UserDetailComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  selectedUser: User | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data) => (this.users = data));
  }

  selectUser(user: User): void {
    this.selectedUser = user;
  }
}
