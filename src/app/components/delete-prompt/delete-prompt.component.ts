import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GenreService } from '../../services/genre.service';
import { Genre } from '../../models/Genre';

@Component({
  selector: 'app-delete-prompt',
  templateUrl: './delete-prompt.component.html',
  styleUrls: ['./delete-prompt.component.scss'],
})
export class DeletePromptComponent implements OnInit {
  genre: string;

  constructor(
    private dialogRef: MatDialogRef<boolean>,
    private genreService: GenreService,
    @Inject(MAT_DIALOG_DATA) private data: Genre
  ) {}

  ngOnInit(): void {
    this.genre = this.data.name;
  }

  onCancel() {
    this.dialogRef.close(false);
  }

  onDelete() {
    this.genreService.deleteGenre(this.data.id).subscribe((responseData) => {
      this.dialogRef.close(true);
    });
  }
}
