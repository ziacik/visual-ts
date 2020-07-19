import { Controller, Get, Query } from '@nestjs/common';
import { ClassInfo } from '@visual-ts/api-interfaces';
import { AppService } from './app.service';

@Controller('analysis')
export class AppController {
	constructor(private readonly appService: AppService) { }

	@Get()
	analyze(@Query('file') pathToFile: string, @Query('class') className: string): ClassInfo {
		return this.appService.analyze(pathToFile, className);
	}
}
