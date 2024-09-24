import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReaderCard } from '../../../core/models/reader-card';

@Component({
  selector: 'app-reader-card-details',
  standalone: true,
  imports: [],
  templateUrl: './reader-card-details.component.html',
  styleUrl: './reader-card-details.component.scss'
})
export class ReaderCardDetailsComponent {
  @Input() readerCard!: ReaderCard;
  @Input() visible: boolean = false;

  @Output() onClose = new EventEmitter();

  public close(): void {
    this.visible = false;
    this.onClose.emit();
  }
}
