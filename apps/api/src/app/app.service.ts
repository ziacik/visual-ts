import { Injectable } from '@nestjs/common';
import { Analyzer } from '@visual-ts/analyzer';
import { ClassInfo } from '@visual-ts/api-interfaces';

@Injectable()
export class AppService {
	constructor(private analyzer: Analyzer) {}

	getData(): ClassInfo {
		return this.analyzer.analyze('/home/ziacik/Workspaces/WebApp/src/MobileCrm/Controllers/Activity/phoneCallForm/phoneCallForm.ts', 'PhoneCallForm');
	}
}
