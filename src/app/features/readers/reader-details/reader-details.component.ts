import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Reader } from '../../../core/models/reader';

@Component({
  selector: 'app-reader-details',
  standalone: true,
  imports: [],
  templateUrl: './reader-details.component.html',
  styleUrl: './reader-details.component.scss'
})
export class ReaderDetailsComponent {
  @Input() reader!: Reader;
  @Input() visible: boolean = false;

  @Output() onClose = new EventEmitter();

  public close(): void {
    this.visible = false;
    this.onClose.emit();
  }
}
