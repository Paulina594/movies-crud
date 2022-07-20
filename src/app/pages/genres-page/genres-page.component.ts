import { Component, OnDestroy, OnInit } from '@angular/core';
import { GenreService } from '../../services/genre.service';
import { Genre } from '../../models/Genre';
import { Subject, Subscription, switchMap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { GenreFormDialogComponent } from '../../components/genre-form-dialog/genre-form-dialog.component';

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

  openDialog() {
    const dialogRef = this.dialog.open(GenreFormDialogComponent, {
      width: '600px',
      data: {},
    });
    dialogRef.afterClosed().subscribe((genreSaved) => {
      if (genreSaved) {
        this.loadGenres.next();
      }
    });
  }
}
