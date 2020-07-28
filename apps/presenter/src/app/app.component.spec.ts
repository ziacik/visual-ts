import { async, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { HttpModelService } from './http-model.service';
import { Model } from './model';
import { ModelService } from './model.service';

describe('AppComponent', () => {
	let testModel: Model;
	let modelService: HttpModelService;

	beforeEach(async(() => {
		testModel = new Model(null, null);
		modelService = new HttpModelService(null);
		jest.spyOn(modelService, 'load').mockReturnValue(of(testModel));
		TestBed.configureTestingModule({
			imports: [RouterTestingModule, NgxGraphModule, NoopAnimationsModule],
			providers: [{ provide: ModelService, useValue: modelService }],
			declarations: [AppComponent],
		}).compileComponents();
	}));

	it('should create the app', () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});

	it('uses ModelService to retrieve a model for the graph', async () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.componentInstance;
		app.ngOnInit();
		const model = await app.model$.toPromise();
		expect(model).toEqual(testModel);
	});
});
