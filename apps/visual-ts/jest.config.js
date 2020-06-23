module.exports = {
	name: 'visual-ts',
	preset: '../../jest.config.js',
	coverageDirectory: '../../coverage/apps/visual-ts',
	snapshotSerializers: [
		'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
		'jest-preset-angular/build/AngularSnapshotSerializer.js',
		'jest-preset-angular/build/HTMLCommentSerializer.js',
	],
};
