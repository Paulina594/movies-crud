import { Component, OnDestroy, OnInit } from '@angular/core';
import { GenreService } from '../../services/genre.service';
import { Genre } from '../../models/Genre';
import { Subject, Subscription, switchMap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import {
  GenreFormDialogComponent,
  GenreFormDialogData,
} from '../../components/genre-form-dialog/genre-form-dialog.component';
import { DeletePromptComponent } from '../../components/delete-prompt/delete-prompt.component';

@Component({
  selector: 'app-genres-page',
  templateUrl: './genres-page.component.html',
  styleUrls: ['./genres-page.component.scss'],
})
export class GenresPageComponent implements OnInit, OnDestroy {
  genres: Genre[];

  private loadGenres = new Subject<void>();

  private sub: Subscription;

  constructor(private genreService: GenreService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.sub = this.loadGenres
      .pipe(switchMap(() => this.genreService.getGenres()))
      .subscribe((genres) => (this.genres = genres));
    this.loadGenres.next();
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  openAddDialog() {
    this.openDialog({ editMode: false });
  }

  openEditDialog(id: number) {
    this.genreService.getGenre(id).subscribe((genre) => {
      this.openDialog({
        editMode: true,
        genre: { id, name: genre.name },
      });
    });
  }

  onDelete(id: number) {
    this.genreService.getGenre(id).subscribe((genre) => {
      this.openDeletePrompt({ id, name: genre.name });
    });
  }

  private openDialog(data: GenreFormDialogData) {
    const dialogRef = this.dialog.open(GenreFormDialogComponent, {
      width: '600px',
      data: data,
    });
    dialogRef.afterClosed().subscribe((genreSaved) => {
      if (genreSaved) {
        this.loadGenres.next();
      }
    });
  }

  private openDeletePrompt(genre: Genre) {
    const dialogRef = this.dialog.open(DeletePromptComponent, {
      width: '450px',
      data: genre,
    });
    dialogRef.afterClosed().subscribe((genreDeleted) => {
      if (genreDeleted) {
        this.loadGenres.next();
      }
    });
  }
}
