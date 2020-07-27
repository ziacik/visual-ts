import { ModelService } from './model.service';
import { Observable, of } from 'rxjs';
import { Model } from './model';
import { Node } from '@swimlane/ngx-graph';

export class VsCodeModelService extends ModelService {
	load(): Observable<Model> {
		const vscode = window['vscode'];
		console.log('API', vscode);
		return of(new Model([{
			id: 'current.name',
			label: 'current.name',
		}], []));
	}
}
