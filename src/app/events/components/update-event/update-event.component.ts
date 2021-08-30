import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { CategoriesService } from 'src/app/services/categories.service';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.scss'],
})
export class UpdateEventComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      action: 'add' | 'update';
    },
    public categoriesService: CategoriesService,
    public eventsService: EventsService,
    public auth: AuthService
  ) {}
  categories$!: Observable<any>;
  minDate: Date = new Date();

  eventForm = this.fb.group({
    title: [null, Validators.required],
    description: [null, Validators.required],
    date: [null, Validators.required],
    skill: [null, Validators.required],
  });

  ngOnInit(): void {
    this.categories$ = this.categoriesService.getCategories().pipe(take(1));
  }

  saveEvent() {
    const formValues = this.eventForm.value;
    this.auth.user$
      .pipe(
        switchMap((user) =>
          this.eventsService.updateEvents({ ...formValues, user_id: user?.sub })
        )
      )
      .subscribe(() => {
        this._snackBar.open('Category updated!', undefined, {
          horizontalPosition: 'end',
          verticalPosition: 'bottom',
          duration: 3000,
        });
      });
  }
}
