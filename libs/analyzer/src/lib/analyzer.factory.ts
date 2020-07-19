import { Project } from 'ts-morph';
import { Analyzer } from './analyzer';

export class AnalyzerFactory {
    create(pathToTsConfig: string): Analyzer {
        const project = new Project({
            tsConfigFilePath: pathToTsConfig
        });
        return new Analyzer(project);
    }
}