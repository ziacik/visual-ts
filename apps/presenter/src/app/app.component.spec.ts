import { async, TestBed, inject } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { AppComponent } from './app.component';
import { take } from 'rxjs/operators';
import { Model } from './model';
import { ModelService } from './model.service';
import { of } from 'rxjs';

describe('AppComponent', () => {
	let testModel: Model;
	let modelService: ModelService;

	beforeEach(async(() => {
		testModel = new Model(null, null);
		TestBed.configureTestingModule({
			imports: [RouterTestingModule, NgxGraphModule, NoopAnimationsModule],
			providers: [ModelService],
			declarations: [AppComponent],
		}).compileComponents();
		modelService = TestBed.inject(ModelService);
		jest.spyOn(modelService, 'load').mockReturnValue(of(testModel));
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
