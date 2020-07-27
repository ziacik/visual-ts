import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Model } from './model';
import { ModelService } from './model.service';

@Component({
	selector: 'visual-ts-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	model$: Observable<Model>;

	constructor(private modelService: ModelService) {}

	ngOnInit(): void {
		this.model$ = this.modelService.load().pipe(tap(x => console.log('loaded', x)));
	}
}
