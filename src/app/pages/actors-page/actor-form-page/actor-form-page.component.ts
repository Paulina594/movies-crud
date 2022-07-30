import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActorService } from '../../../services/actor.service';
import { Router } from '@angular/router';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatDateFormats,
} from '@angular/material/core';

import * as moment from 'moment';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';

export const MY_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'YYYY-MM-DD',
    dateA11yLabel: 'YYYY-MM-DD',
    monthYearA11yLabel: 'YYYY-MM-DD',
  },
};

@Component({
  selector: 'app-actor-form-page',
  templateUrl: './actor-form-page.component.html',
  styleUrls: ['./actor-form-page.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: MY_FORMATS,
    },
  ],
})
export class ActorFormPageComponent implements OnInit {
  form: FormGroup;
  title: string;
  btnTitle: string;
  editMode: boolean;
  img: string =
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png';
  maxDate: Date;

  constructor(
    private actorService: ActorService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.maxDate = new Date();
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: new FormControl('', [
        Validators.required,
        Validators.pattern('([a-zA-Z ])*'),
        Validators.pattern('.*\\S.*'),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.pattern('([a-zA-Z ])*'),
        Validators.pattern('.*\\S.*'),
      ]),
      photo: new FormControl(''),
      dob: new FormControl('', [Validators.required]),
    });

    if (!this.editMode) {
      this.title = 'Add new actor';
      this.btnTitle = 'Save';
    }
  }

  uploadPhoto() {
    this.img = this.form.value.photo;
  }

  onSave() {
    const dob = this.form.value.dob;
    const actor = {
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      birthDate: dob.format('YYYY-MM-DD'),
      photoUrl: this.form.value.photo,
    };
    this.actorService.saveActor(actor).subscribe((responseData) => {
      this.router.navigate(['/actor']);
    });
  }
}
