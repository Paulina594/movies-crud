import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GenreService } from '../../services/genre.service';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Genre } from '../../models/Genre';
import { Observable } from 'rxjs';

export type GenreFormDialogData = {
  editMode: boolean;
  genre?: Genre;
};

@Component({
  selector: 'app-genre-form-dialog',
  templateUrl: './genre-form-dialog.component.html',
  styleUrls: ['./genre-form-dialog.component.scss'],
})
export class GenreFormDialogComponent implements OnInit {
  form: FormGroup;
  modalTitle: string;
  submitTitle: string;
  placeholder: string;
  editMode: boolean;

  constructor(
    private dialogRef: MatDialogRef<boolean>,
    private genreService: GenreService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: GenreFormDialogData
  ) {}

  ngOnInit(): void {
    if (this.data.editMode) {
      this.modalTitle = 'Edit genre';
      this.submitTitle = 'Update';
      this.placeholder = 'Genre';
      this.editMode = true;
    } else {
      this.modalTitle = 'Add new genre';
      this.submitTitle = 'Save';
      this.placeholder = 'New genre';
      this.editMode = false;
    }

    this.form = this.fb.group({
      name: new FormControl(this.data.genre?.name ?? '', [
        Validators.required,
        Validators.pattern('([a-zA-Z ])*'),
        Validators.pattern('.*\\S.*'),
      ]),
    });

    if (this.data.editMode) {
      this.form
        .get('name')
        .addValidators(this.createUniqueNameValidator.bind(this));
    }
  }

  onCancel() {
    this.dialogRef.close(false);
  }

  onSave() {
    if (this.form.invalid) {
      return;
    }

    const trimmedValue = this.form.value.name.trim();
    const capitalizeValue =
      trimmedValue[0].toUpperCase() + trimmedValue.substring(1).toLowerCase();

    const value = {
      ...this.form.value,
      name: capitalizeValue,
    };

    const saveMethod: Observable<Genre> = this.data.editMode
      ? this.genreService.editGenre(this.data.genre.id, value.name)
      : this.genreService.saveGenre(value.name);

    saveMethod.subscribe((responseData) => {
      this.dialogRef.close(true);
    });
  }

  private createUniqueNameValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    const value = control.value;
    const originalName = this.data.genre.name;
    const errors: ValidationErrors = { uniqueName: true };
    return value === originalName ? errors : null;
  }
}
