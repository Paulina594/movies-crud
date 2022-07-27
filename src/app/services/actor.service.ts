import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actor } from '../models/Actor';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ActorService {
  readonly API_URL = 'http://movies.sdrozdz.idl.pl/api/actor/';

  constructor(private http: HttpClient) {}

  getActors(): Observable<Actor[]> {
    return this.http.get<any[]>(this.API_URL).pipe(
      map((raw: any[]) =>
        raw.map((actor) => ({
          id: actor.id,
          firstName: actor['first_name'],
          lastName: actor['last_name'],
          birthDate: actor['birth_date'],
        }))
      )
    );
  }
}
