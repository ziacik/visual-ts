import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClassInfo } from '@visual-ts/api-interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Model } from './model';
import { ModelService } from './model.service';

@Injectable({
	providedIn: 'root',
})
export class HttpModelService extends ModelService {
	constructor(private http: HttpClient) {
		super();
	}

	load(): Observable<Model> {
		return this.http.get('http://localhost:3333/api/analysis?file=entityHub.ts&class=EntityHub').pipe(map((classInfo) => this.toModel(classInfo as ClassInfo)));
	}

	private toModel(classInfo: ClassInfo): Model {
		const nodes = [];
		const edges = [];
		let current = classInfo;
		let lastNode = null;
		while (current) {
			const node = {
				id: current.name,
				label: current.name,
			};

			nodes.push(node);

			if (lastNode) {
				const edge = {
					id: node.id + '-' + lastNode.id,
					source: lastNode.id,
					target: node.id,
				};
				edges.push(edge);
			}

			lastNode = node;
			current = current.base;
		}

		return new Model(nodes, edges);
	}
}
