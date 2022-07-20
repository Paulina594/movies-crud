import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreFormDialogComponent } from './genre-form-dialog.component';

describe('GenreFormDialogComponent', () => {
  let component: GenreFormDialogComponent;
  let fixture: ComponentFixture<GenreFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenreFormDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenreFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
