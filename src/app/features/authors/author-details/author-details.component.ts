import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Author } from '../../../core/models/author';

@Component({
  selector: 'app-author-details',
  standalone: true,
  imports: [],
  templateUrl: './author-details.component.html',
  styleUrl: './author-details.component.scss'
})
export class AuthorDetailsComponent {
  @Input() author!: Author;
  @Input() visible: boolean = false;

  @Output() onClose = new EventEmitter();

  public close(): void {
    this.visible = false;
    this.onClose.emit();
  }
}
