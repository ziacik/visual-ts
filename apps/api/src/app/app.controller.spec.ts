import { Test, TestingModule } from '@nestjs/testing';
import { Analyzer } from '@visual-ts/analyzer';
import { ClassInfo } from '@visual-ts/api-interfaces';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
	let app: TestingModule;
	let testClassInfo: ClassInfo;
	let appService: AppService;

	beforeAll(async () => {
		testClassInfo = { name: 'someclass', base: null };
		app = await Test.createTestingModule({
			controllers: [AppController],
			providers: [AppService, Analyzer],
		}).compile();

		appService = app.get<AppService>(AppService);
		jest.spyOn(appService, 'analyze').mockReturnValue(testClassInfo);
	});

	describe('analyze', () => {
		it('uses AppService to retrieve analysis for the path and class specified and returns it', () => {
			const appController = app.get<AppController>(AppController);
			expect(appController.analyze('/path/to.ts', 'SomeClass')).toEqual(testClassInfo);
			expect(appService.analyze).toHaveBeenCalledWith('/path/to.ts', 'SomeClass');
		});
	});
});
