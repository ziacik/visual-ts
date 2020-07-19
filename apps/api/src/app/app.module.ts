import { Module } from '@nestjs/common';
import { Analyzer, AnalyzerFactory } from '@visual-ts/analyzer';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
	imports: [],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: Analyzer,
			useFactory: () => {
				return new AnalyzerFactory().create('/home/ziacik/Workspaces/WebApp/tsconfig.json');
			},
		},
	],
})
export class AppModule {}
