import { Presenter, ClassInfo } from './presenter';

describe('Presenter', () => {
	let presenter: Presenter;

	beforeEach(() => {
		presenter = new Presenter();
	});

	it('takes a class info and generates a dependency graph', () => {
		const classInfo: ClassInfo = {
			name: 'SomeChild',
			base: {
				name: 'SomeRoot',
				base: null,
			},
		};
		const result = presenter.present(classInfo, null);
		console.log(result);

		expect(result).toBeTruthy();
	});
});
