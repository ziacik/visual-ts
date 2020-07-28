import { Inject, InjectionToken } from '@angular/core';
import { ClassInfo } from '@visual-ts/api-interfaces';
import { fromEvent, Observable } from 'rxjs';
import { map, take, filter } from 'rxjs/operators';
import { Model } from './model';
import { ModelService } from './model.service';

export const VSCODE_API = new InjectionToken<any>('VSCODE-API');

export class VsCodeModelService extends ModelService {
	constructor(@Inject(VSCODE_API) private vscode: any) {
		super();
	}

	load(): Observable<Model> {
		const result = fromEvent(window, 'message').pipe(
			map(it => (<any>it).data as ClassInfo),
			map(this.toModel),
			take(1)
		);
		this.vscode.postMessage({
			resource: 'analysis',
			file: 'entityHub.ts',
			class: 'EntityHub',
		});
		return result;
	}

	// TODO move this out
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
