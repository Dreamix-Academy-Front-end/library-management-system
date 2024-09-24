import { Component, OnInit } from '@angular/core';
import { Book } from '../../../core/models/book';
import { BookService } from '../book.service';
import { AuthService } from '../../../core/auth/auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BookDetailsComponent } from '../book-details/book-details.component';
import { CreateBookComponent } from '../create-book/create-book.component';
import { EditBookComponent } from '../edit-book/edit-book.component';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { SearchByTitleComponent } from '../search-bars/search-by-title/search-by-title.component';
import { SearchSelectorComponent } from "../search-selector/search-selector.component";
import { SearchComponent } from "../search/search.component";

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    BookDetailsComponent,
    CreateBookComponent,
    EditBookComponent,
    DeleteConfirmationComponent,
    SearchByTitleComponent,
    SearchSelectorComponent,
    SearchComponent
],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  isLibrarian: boolean = false;
  selectedBook!: Book;
  isModalOpen: boolean = false;
  showDeleteModal: boolean = false;

  constructor(private bookService: BookService, private authService: AuthService ) {  
  }

  ngOnInit(): void {
    this.isLibrarian = this.authService.getUserRole() === 'librarian';
    this.loadBooks();
  }

  openBookDetails(book: Book): void {
    this.selectedBook = book;
    this.isModalOpen = true;
  }

  closeBookDetails(): void {
    this.isModalOpen = false;
  }

  loadBooks(): void {
    this.bookService.getAllBooks().subscribe((books) => {
      this.books = books;
    });
  }

  onBookUpdated(updatedBook: Book) {
    this.bookService.editBook(updatedBook.id, updatedBook).subscribe(() => {
      this.loadBooks();
      this.selectedBook = this.books.find(book => book.id === updatedBook.id) || this.selectedBook;
    });
  }

  onCancelEdit() {
    this.selectedBook = this.books.find(book => book.id === this.selectedBook.id) || this.selectedBook;
  }

  openDeleteModal(book: Book): void {
    this.selectedBook = book;
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
  }

  confirmDelete(): void {
    if (this.selectedBook) {
      this.bookService.deleteBook(this.selectedBook.id).subscribe(() => {
        this.loadBooks();
        this.closeDeleteModal();
      });
    }
  }
  
  deleteBook(id: number): void {
    this.bookService.deleteBook(id).subscribe(() => {
      this.loadBooks();
    })
  }

  updateBookList(results: Book[]) {
    this.books = results;
  }
}
