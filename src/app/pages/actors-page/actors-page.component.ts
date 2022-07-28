import { Component, OnDestroy, OnInit } from '@angular/core';
import { Actor } from '../../models/Actor';
import { map, Subject, Subscription, switchMap } from 'rxjs';
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
      .pipe(
        switchMap(() => this.actorService.getActors()),
        map((actors) => actors.map(this.prepareActor))
      )
      .subscribe((actors: Actor[]) => (this.actors = actors));
    this.loadActors.next();
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  private prepareActor(actor: Actor): Actor {
    const finalPhotoUrl =
      actor.photoUrl === null
        ? 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'
        : actor.photoUrl;
    return {
      ...actor,
      photoUrl: `url("${finalPhotoUrl}")`,
    };
  }
}
