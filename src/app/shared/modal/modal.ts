import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: false,
  templateUrl: './modal.html',
  styleUrl: './modal.css',
})
export class Modal {
@Input() title = '';
  @Input() visible = false;
  @Output() close = new EventEmitter<void>();
   onBackdrop(e: MouseEvent) {
    // close only if click outside the dialog box
    if ((e.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.close.emit();
    }
  }
}
