import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import { ClassInfo } from '@visual-ts/api-interfaces';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get('hello')
	getData(): ClassInfo {
		return this.appService.getData();
	}
}
