import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorFormPageComponent } from './actor-form-page.component';

describe('ActorFormPageComponent', () => {
  let component: ActorFormPageComponent;
  let fixture: ComponentFixture<ActorFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActorFormPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActorFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
