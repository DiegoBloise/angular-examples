import {
  booleanAttribute,
  Component,
  HostListener,
  input,
  model,
} from '@angular/core';

@Component({
  selector: 'app-dialog',
  imports: [],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
})
export class DialogComponent {
  title = input.required<string>();
  dialogId = input.required<string>();
  visible = model<boolean>();
  closeOnEscape = input(false, { transform: booleanAttribute });

  @HostListener('window:keydown.escape', ['$event']) handleKeyDown(
    event: KeyboardEvent
  ) {
    if (this.closeOnEscape()) this.visible.set(false);
  }
}
