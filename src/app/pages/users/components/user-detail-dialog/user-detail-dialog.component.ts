import { Component, model } from '@angular/core';
import { DialogComponent } from '../../../../components/dialog/dialog.component';
import { User } from '../../../../models/user.model';

@Component({
  selector: 'user-detail-dialog',
  imports: [DialogComponent],
  templateUrl: './user-detail-dialog.component.html',
  styleUrl: './user-detail-dialog.component.css',
})
export class UserDetailDialogComponent {
  fieldsClass = {
    label: 'text-right text-sm font-semibold text-base-content/50',
    value: 'col-span-2',
  };

  user = model<User>();
  visible = model<boolean>(false);

  closeDialog() {
    this.visible.set(false);
  }

  openDialog() {
    this.visible.set(true);
  }
}
