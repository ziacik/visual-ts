import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpModelService } from './http-model.service';

describe('HttpModelService', () => {
	let service: HttpModelService;

	beforeEach(() => {
		TestBed.configureTestingModule({ imports: [HttpClientModule] });
		service = TestBed.inject(HttpModelService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
