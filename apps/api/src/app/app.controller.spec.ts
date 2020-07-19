import { Test, TestingModule } from '@nestjs/testing';
import { Analyzer } from '@visual-ts/analyzer';
import { ClassInfo } from '@visual-ts/api-interfaces';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
	let app: TestingModule;
	let testClassInfo: ClassInfo;

	beforeAll(async () => {
		testClassInfo = { name: 'someclass', base: null };
		app = await Test.createTestingModule({
			controllers: [AppController],
			providers: [AppService, Analyzer],
		}).compile();

		const appService = app.get<AppService>(AppService);
		jest.spyOn(appService, 'getData').mockReturnValue(testClassInfo);
	});

	describe('getData', () => {
		it('uses AppService to getData', () => {
			const appController = app.get<AppController>(AppController);
			expect(appController.getData()).toEqual(testClassInfo);
		});
	});
});
