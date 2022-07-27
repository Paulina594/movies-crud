import { Component, OnDestroy, OnInit } from '@angular/core';
import { Actor } from '../../models/Actor';
import { Subject, Subscription, switchMap } from 'rxjs';
import { ActorService } from '../../services/actor.service';

@Component({
  selector: 'app-actors-page',
  templateUrl: './actors-page.component.html',
  styleUrls: ['./actors-page.component.scss'],
})
export class ActorsPageComponent implements OnInit, OnDestroy {
  actors: Actor[];

  private loadActors = new Subject<void>();
  private sub: Subscription;

  constructor(private actorService: ActorService) {}

  ngOnInit() {
    this.sub = this.loadActors
      .pipe(switchMap(() => this.actorService.getActors()))
      .subscribe((actors: Actor[]) => (this.actors = actors));
    this.loadActors.next();
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
