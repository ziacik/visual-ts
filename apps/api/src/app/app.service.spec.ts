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

	describe('analyze', () => {
		it('uses Analyzer to generate analysis and returns it', () => {
			expect(service.analyze('/path/to.ts', 'SomeClass')).toEqual(testClassInfo);
			expect(analyzer.analyze).toHaveBeenCalledWith('/path/to.ts', 'SomeClass');
		});
	});
});
