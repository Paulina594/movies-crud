import { Component, OnDestroy, OnInit } from '@angular/core';
import { GenreService } from '../../services/genre.service';
import { Genre } from '../../models/Genre';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-genres-page',
  templateUrl: './genres-page.component.html',
  styleUrls: ['./genres-page.component.scss'],
})
export class GenresPageComponent implements OnInit, OnDestroy {
  genres: Genre[];

  private sub: Subscription;

  constructor(private genreService: GenreService) {}

  ngOnInit(): void {
    this.sub = this.genreService
      .getGenres()
      .subscribe((genres) => (this.genres = genres));
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
