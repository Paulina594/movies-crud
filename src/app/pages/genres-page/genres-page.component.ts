import { Component, OnInit } from '@angular/core';
import { GenreService } from '../../services/genre.service';
import { Genre } from '../../models/Genre';

@Component({
  selector: 'app-genres-page',
  templateUrl: './genres-page.component.html',
  styleUrls: ['./genres-page.component.scss'],
})
export class GenresPageComponent implements OnInit {
  genres: Genre[];

  constructor(private genreService: GenreService) {}

  ngOnInit(): void {
    this.genreService.getGenres().subscribe((genres) => (this.genres = genres));
  }
}
