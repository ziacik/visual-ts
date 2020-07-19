import { Module } from '@nestjs/common';
import { Analyzer, AnalyzerFactory } from '@visual-ts/analyzer';
import * as path from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const projectDir = process.env.PROJECT || '.';
const tsconfigPath = path.resolve(projectDir, 'tsconfig.json');

console.log(`Using ts config file: ${tsconfigPath}.`);

@Module({
	imports: [],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: Analyzer,
			useFactory: () => {
				return new AnalyzerFactory().create(tsconfigPath);
			},
		},
	],
})
export class AppModule { }
