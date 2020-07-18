import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Model } from './model';

@Injectable({
	providedIn: 'root'
})
export class ModelService {

	constructor() { }

	load(): Observable<Model> {
		const edges = [
			{
				id: 'a',
				source: 'first',
				target: 'second',
				label: 'is parent of'
			}, {
				id: 'b',
				source: 'first',
				target: 'third',
				label: 'custom label'
			}
		];
		const nodes = [
			{
				id: 'first',
				label: 'DynamicEntityList'
			}, {
				id: 'second',
				label: 'BaseEntityList'
			}, {
				id: 'third',
				label: 'EntityHub'
			}
		];
		return of(new Model(nodes, edges));
	}
}
