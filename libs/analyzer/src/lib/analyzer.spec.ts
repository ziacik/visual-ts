import { Analyzer } from './analyzer';
import { Project } from 'ts-morph';

describe('Analyzer', () => {
	let analyzer: Analyzer;
	let project: Project;

	beforeEach(() => {
		project = new Project();
		analyzer = new Analyzer(project);
	});

	it('throws if source file not found in project', () => {
		expect(() => analyzer.analyze('/unknown/path.ts', 'Kvak')).toThrowError('Could not find source file in project at the provided path: /unknown/path.ts');
	});

	it('throws if source file does not contain the class specified', () => {
		project.createSourceFile('some/path.ts', `class Kvak {}`);
		expect(() => analyzer.analyze('some/path.ts', 'Unknown')).toThrowError(`Expected to find class named 'Unknown'.`);
	});

	it('returns empty list of base classes if there is none', () => {
		project.createSourceFile('some/path.ts', `class Kvak {}`);
		const result = analyzer.analyze('some/path.ts', 'Kvak');
		expect(result.base).toBeFalsy();
	});

	it('returns a single base class if there is one', () => {
		project.createSourceFile('some/path.ts', `class Kvok {}; class Kvak extends Kvok {};`);
		const result = analyzer.analyze('some/path.ts', 'Kvak');
		expect(result.base.name).toEqual('Kvok');
		expect(result.base.base).toBeFalsy();
	});

	it('returns a chain of base classes if there are more', () => {
		project.createSourceFile('some/path.ts', `class Kvik {}; class Kvok extends Kvik {}; class Kvak extends Kvok {};`);
		const result = analyzer.analyze('some/path.ts', 'Kvak');
		expect(result.base.name).toEqual('Kvok');
		expect(result.base.base.name).toEqual('Kvik');
		expect(result.base.base.base).toBeFalsy();
	});

	it('returns a chain of base classes even if they are in different files', () => {
		project.createSourceFile('some/pathI.ts', `export class Kvik {};`);
		project.createSourceFile('some/pathO.ts', `import { Kvik } from './pathI'; export class Kvok extends Kvik {};`);
		project.createSourceFile('some/path.ts', `import { Kvok } from './pathO'; export class Kvak extends Kvok {};`);
		const result = analyzer.analyze('some/path.ts', 'Kvak');
		expect(result.base.name).toEqual('Kvok');
		expect(result.base.base.name).toEqual('Kvik');
		expect(result.base.base.base).toBeFalsy();
	});
});
