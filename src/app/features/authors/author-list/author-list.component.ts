import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Author } from '../../../core/models/author';
import { AuthorService } from '../author.service';
import { AuthService } from '../../../core/auth/auth.service';
import { AuthorDetailsComponent } from "../author-details/author-details.component";
import { DeleteAuthorConfirmationComponent } from "../delete-author-confirmation/delete-author-confirmation.component";
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-author-list',
  standalone: true,
  imports: 
  [
    CommonModule, 
    RouterLink, 
    AuthorDetailsComponent, 
    DeleteAuthorConfirmationComponent,
    SearchComponent
  ],
  templateUrl: './author-list.component.html',
  styleUrl: './author-list.component.scss'
})
export class AuthorListComponent {
  authors: Author[] = [];
  isLibrarian: boolean = false;
  selectedAuthor!: Author;
  isModalOpen: boolean = false;
  showDeleteModal: boolean = false;

  constructor(private authorService: AuthorService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.isLibrarian = this.authService.getUserRole() === 'librarian';
    this.loadAuthors();
  }

  openAuthorDetails(author: Author): void {
    this.selectedAuthor = author;
    this.isModalOpen = true;
  }

  closeAuthorDetails(): void {
    this.isModalOpen = false;
  }

  loadAuthors(): void {
    this.authorService.getAllAuthors().subscribe((authors) => {
      this.authors = authors;
    });
  }

  onAuthorUpdated(updatedAuthor: Author) {
    this.authorService.editAuthor(updatedAuthor.id, updatedAuthor).subscribe(() => {
      this.loadAuthors();
      this.selectedAuthor = this.authors.find(author => author.id === updatedAuthor.id) || this.selectedAuthor;
    });
  }

  onCancelEdit() {
    this.selectedAuthor = this.authors.find(author => author.id === this.selectedAuthor.id) || this.selectedAuthor;
  }

  openDeleteModal(author: Author): void {
    this.selectedAuthor = author;
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
  }

  confirmDelete(): void {
    if (this.selectedAuthor) {
      this.authorService.deleteAuthor(this.selectedAuthor.id).subscribe(() => {
        this.loadAuthors();
        this.closeDeleteModal();
      });
    }
  }

  deleteAuthor(id: number): void {
    this.authorService.deleteAuthor(id).subscribe(() => {
      this.loadAuthors();
    })
  }

  updateAuthorList(results: Author[]) {
    this.authors = results;
  }
}
