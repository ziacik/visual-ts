module.exports = {
	name: 'presenter',
	preset: '../../jest.config.js',
	coverageDirectory: '../../coverage/libs/presenter',
	snapshotSerializers: [
		'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
		'jest-preset-angular/build/AngularSnapshotSerializer.js',
		'jest-preset-angular/build/HTMLCommentSerializer.js',
	],
};
