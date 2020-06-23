import { Analyzer } from './analyzer';

const TS_CONFIG_PATH = '/home/kolik/Workspaces/Trawolingo/travelbook-designer-ui/tsconfig.json';

describe('Analyzer', () => {
	let analyzer: Analyzer;

	beforeEach(() => {
		analyzer = new Analyzer(TS_CONFIG_PATH);
	});

	it('does it', () => {
		analyzer.analyze('/home/kolik/Workspaces/Trawolingo/travelbook-designer-ui/src/app/core/query.service.ts');
	});
});
