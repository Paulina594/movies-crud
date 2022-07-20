import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GenreService } from '../../services/genre.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-genre-form-dialog',
  templateUrl: './genre-form-dialog.component.html',
  styleUrls: ['./genre-form-dialog.component.scss'],
})
export class GenreFormDialogComponent implements OnInit {
  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<boolean>,
    private genreService: GenreService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: new FormControl(this.data.name, Validators.required),
    });
  }

  onCancel() {
    this.dialogRef.close(false);
  }

  onSave() {
    if (this.form.invalid) {
      return;
    }
    const value = this.form.value;
    this.genreService.saveGenre(value.name).subscribe((responseData) => {
      this.dialogRef.close(true);
    });
  }
}
