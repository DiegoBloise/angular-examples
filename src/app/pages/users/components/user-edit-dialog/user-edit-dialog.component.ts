import { Component, effect, model, OnInit, output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DialogComponent } from '../../../../components/dialog/dialog.component';
import { User } from '../../../../models/user.model';

@Component({
  selector: 'user-edit-dialog',
  imports: [DialogComponent, ReactiveFormsModule],
  templateUrl: './user-edit-dialog.component.html',
  styleUrl: './user-edit-dialog.component.css',
})
export class UserEditDialogComponent implements OnInit {
  user = model<User>();

  userForm!: FormGroup;

  show = model<boolean>(false);

  onSubmit = output<User>();

  ngOnInit(): void {
    this.userForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl(''),
      website: new FormControl(''),
    });
  }

  openDialog(user: User) {
    this.userForm.patchValue(user);
    this.show.set(true);
  }

  closeDialog() {
    this.show.set(false);
  }

  onSave(): void {
    if (this.userForm.valid) {
      this.onSubmit.emit(this.userForm.value);
      this.closeDialog();
    }
  }

  get dialogTitle(): string {
    if (this.user() && !this.user()?.id) {
      return 'New user';
    } else {
      return 'Edit user';
    }
  }
}
