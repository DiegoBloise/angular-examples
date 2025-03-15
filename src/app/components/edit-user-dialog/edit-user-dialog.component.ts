import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  MinLengthValidator,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {
  MatFormField,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { User } from '../../models/user.model';
import { MatDivider } from '@angular/material/divider';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { merge } from 'rxjs';

@Component({
  selector: 'app-edit-user-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatLabel,
    MatFormFieldModule,
    MatInputModule,
    MatFormField,
    MatDivider,
  ],
  templateUrl: './edit-user-dialog.component.html',
  styleUrl: './edit-user-dialog.component.scss',
})
export class EditUserDialogComponent implements OnInit {
  userForm!: FormGroup;

  user: User = inject(MAT_DIALOG_DATA);

  dialogRef = inject(MatDialogRef<EditUserDialogComponent>);

  ngOnInit(): void {
    this.userForm = new FormGroup({
      name: new FormControl(this.user.name, [
        Validators.required,
        Validators.minLength(4),
      ]),
      email: new FormControl(this.user.email, [
        Validators.required,
        Validators.email,
      ]),
      phone: new FormControl(this.user.phone, [
        Validators.minLength(11),
        Validators.maxLength(11),
      ]),
      website: new FormControl(this.user.website),
    });
  }

  errorMessage(fieldName: string): string {
    const field = this.userForm.get(fieldName);

    if (!field) {
      return 'Campo não encontrado';
    }

    if (field.hasError('required')) {
      return 'Campo obrigatório';
    }

    if (field.hasError('minlength')) {
      return `Tamanho mínimo de ${field.errors?.['minlength'].requiredLength} caracteres`;
    }

    if (field.hasError('maxlength')) {
      return `Tamanho máximo de ${field.errors?.['maxlength'].requiredLength} caracteres`;
    }

    if (field.hasError('email')) {
      return 'E-mail inválido';
    }

    if (field.hasError('pattern')) {
      return 'Formato inválido';
    }

    if (field.hasError('min')) {
      return `O valor mínimo permitido é ${field.errors?.['min'].min}`;
    }

    if (field.hasError('max')) {
      return `O valor máximo permitido é ${field.errors?.['max'].max}`;
    }

    if (field.hasError('customError')) {
      return field.errors?.['customError'];
    }

    return 'Informe um valor válido';
  }

  onSave(): void {
    if (this.userForm.valid) {
      this.dialogRef.close(this.userForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
