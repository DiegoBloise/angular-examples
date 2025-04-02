// import { Component, inject } from '@angular/core';
// import { MatButtonModule } from '@angular/material/button';
// import {
//   MAT_DIALOG_DATA,
//   MatDialogActions,
//   MatDialogClose,
//   MatDialogContent,
//   MatDialogRef,
//   MatDialogTitle,
// } from '@angular/material/dialog';
// import { MatDivider } from '@angular/material/divider';
// import { MatIcon } from '@angular/material/icon';

// @Component({
//   selector: 'confirmation-dialog',
//   imports: [
//     MatDialogTitle,
//     MatDialogContent,
//     MatDialogActions,
//     MatDialogClose,
//     MatButtonModule,
//     MatIcon,
//     MatDivider,
//   ],
//   templateUrl: './confirmation-dialog.component.html',
//   styleUrl: './confirmation-dialog.component.scss',
// })
// export class ConfirmationDialogComponent {
//   data = inject(MAT_DIALOG_DATA);
//   dialogRef = inject(MatDialogRef<ConfirmationDialogComponent>);

//   onConfirm() {
//     this.dialogRef.close(true);
//   }

//   onCancel() {
//     this.dialogRef.close(false);
//   }
// }
