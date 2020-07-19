import { Injectable } from '@nestjs/common';
import { Analyzer } from '@visual-ts/analyzer';
import { ClassInfo } from '@visual-ts/api-interfaces';

@Injectable()
export class AppService {
	constructor(private analyzer: Analyzer) {}

	analyze(pathToFile: string, className?: string): ClassInfo {
		return this.analyzer.analyze(pathToFile, className);
	}
}
