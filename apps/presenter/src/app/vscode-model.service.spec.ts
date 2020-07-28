import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { VsCodeModelService, VSCODE_API } from './vscode-model.service';
import { ClassInfo } from '@visual-ts/api-interfaces';

describe('VsCodeModelService', () => {
	let service: VsCodeModelService;
	let vscode: any;

	beforeEach(() => {
		vscode = {
			postMessage: jest.fn(),
		};
		TestBed.configureTestingModule({
			providers: [
				{
					provide: VSCODE_API,
					useValue: vscode,
				},
				VsCodeModelService,
			],
		});
		service = TestBed.inject(VsCodeModelService);
	});

	it('load requests analysis from backend by sending a message to vscode', () => {
		service.load();
		expect(vscode.postMessage).toHaveBeenCalledWith({
			resource: 'analysis',
			file: 'entityHub.ts',
			class: 'EntityHub',
		});
	});

	it('load receives analysis from backend by getting a message from vscode and transforms it to model', async () => {
		const analysis: ClassInfo = {
			name: 'Child',
			base: {
				name: 'Base',
				base: null,
			},
		};
		const promise = service.load().toPromise();
		window.postMessage(analysis, '*');
		const model = await promise;
		expect(model.nodes.map((it) => it.label)).toEqual(['Child', 'Base']);
		expect(model.edges.length).toBe(1);
		expect(model.edges[0].source).toEqual('Child');
		expect(model.edges[0].target).toEqual('Base');
	});
});
