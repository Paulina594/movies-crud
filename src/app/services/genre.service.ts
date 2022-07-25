import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Genre } from '../models/Genre';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GenreService {
  readonly API_URL = 'http://movies.sdrozdz.idl.pl/api/genre/';

  constructor(private http: HttpClient) {}

  getGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(this.API_URL);
  }

  saveGenre(genre: string): Observable<Genre> {
    return this.http.post<Genre>(this.API_URL, {
      name: genre,
    });
  }

  getGenre(id: number): Observable<Genre> {
    return this.http.get<Genre>(`${this.API_URL}${id}/`);
  }

  editGenre(id: number, genre: string): Observable<Genre> {
    return this.http.put<Genre>(`${this.API_URL}${id}/`, {
      name: genre,
    });
  }

  deleteGenre(id: number): Observable<Genre> {
    return this.http.delete<Genre>(`${this.API_URL}${id}/`);
  }
}
