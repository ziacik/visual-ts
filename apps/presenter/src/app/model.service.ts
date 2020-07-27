import { Observable } from 'rxjs';
import { Model } from './model';

export abstract class ModelService {
	abstract load(): Observable<Model>;
}
