import { Test } from '@nestjs/testing';
import { Analyzer } from '@visual-ts/analyzer';
import { ClassInfo } from '@visual-ts/api-interfaces';
import { AppService } from './app.service';

describe('AppService', () => {
	let service: AppService;
	let analyzer: Analyzer;
	let testClassInfo: ClassInfo;

	beforeAll(async () => {
		const app = await Test.createTestingModule({
			providers: [AppService, Analyzer],
		}).compile();

		analyzer = app.get<Analyzer>(Analyzer);

		testClassInfo = { name: 'someclass', base: null };
		jest.spyOn(analyzer, 'analyze').mockReturnValue(testClassInfo);

		service = app.get<AppService>(AppService);
	});

	describe('getData', () => {
		it('uses Analyzer to analyze generate analysis and returns it', () => {
			expect(service.getData()).toEqual(testClassInfo);
		});
	});
});
