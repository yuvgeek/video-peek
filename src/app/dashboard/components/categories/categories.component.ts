import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  isLoading = true;

  categories$!: Observable<any>;
  constructor(public categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.categories$ = this.categoriesService.getCategories().pipe(
      take(1),
      tap(() => {
        this.isLoading = false;
      })
    );
  }
}
