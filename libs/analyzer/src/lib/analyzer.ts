import { Project, Node, ClassDeclaration } from 'ts-morph';

export interface ClassInfo {
	name: string;
	base: ClassInfo;
}

export class Analyzer {
	static readonly messages = {};

	constructor(private project: Project) {}

	analyze(sourceFilePath: string, className: string): ClassInfo {
		const sourceFile = this.project.getSourceFileOrThrow(sourceFilePath);
		const rootClass = sourceFile.getClassOrThrow(className);
		return this.analyzeClass(rootClass);

		console.log(sourceFile.getClasses().map((it) => it.getName()));

		// // initExportsCache(sourceFile);
		// const allExports = this.findAllExports(project);

		// console.dir(allExports);

		// const allDependencies = new Set();
		// const allIdentifierReplacementDescriptors = [];

		// const namespaces = sourceFile.getNamespaces();

		// for (const namespace of namespaces) {
		// 	const myModuleName = namespace.getName();
		// 	// TODO review: is there really always a single block?
		// 	const moduleBlock = namespace.getFirstDescendantByKindOrThrow(250);
		// 	const { dependencies, identifierReplacementDescriptors } = this.findDependencies(allExports, myModuleName, sourceFilePath, moduleBlock);
		// 	dependencies.forEach((dependency) => allDependencies.add(dependency));
		// 	allIdentifierReplacementDescriptors.push(...identifierReplacementDescriptors);
		// }

		// allIdentifierReplacementDescriptors.sort((a, b) => a.start - b.start);

		// let inflationOffset = 0;

		// const namespacePositions = sourceFile.getNamespaces().map((ns) => {
		// 	const body = ns.getChildSyntaxList();
		// 	const start = body.getStart();
		// 	const end = body.getEnd();
		// 	const namespaceInflation = allIdentifierReplacementDescriptors
		// 		.filter((it) => it.start >= start && it.end <= end)
		// 		.reduce((sum, rid) => sum + rid.inflate, 0);
		// 	const inflatedStart = start + inflationOffset;
		// 	const inflatedEnd = end + inflationOffset + namespaceInflation;
		// 	inflationOffset += namespaceInflation;
		// 	const removedLinesStart = body.getStartLineNumber() - ns.getStartLineNumber();
		// 	const removedLinesEnd = ns.getEndLineNumber() - body.getEndLineNumber();
		// 	return { start: inflatedStart, end: inflatedEnd, removedLinesStart, removedLinesEnd };
		// });

		// namespacePositions.sort((a, b) => a.start - b.start);

		// let prevEnd = 0;
		// const fullSourceText = sourceFile.getFullText();
		// const newSourceParts = [];

		// for (const replaceIdent of allIdentifierReplacementDescriptors) {
		// 	newSourceParts.push(fullSourceText.substring(prevEnd, replaceIdent.start));
		// 	newSourceParts.push(replaceIdent.newIdentifier);
		// 	prevEnd = replaceIdent.end;
		// }

		// const sourceWithReplacements = newSourceParts.join('') + fullSourceText.substr(prevEnd);
		// const unwrappedModuleParts = [];

		// for (const namespacePosition of namespacePositions) {
		// 	if (namespacePosition.removedLinesStart) unwrappedModuleParts.push('\n'.repeat(namespacePosition.removedLinesStart));
		// 	unwrappedModuleParts.push(sourceWithReplacements.substring(namespacePosition.start, namespacePosition.end));
		// 	if (namespacePosition.removedLinesEnd) unwrappedModuleParts.push('\n'.repeat(namespacePosition.removedLinesEnd));
		// }

		// const unwrappedSource = unwrappedModuleParts.join('');
		// const hasDependencies = allDependencies.size > 0;
		// const imports = hasDependencies ? toImportString(allDependencies, sourceFilePath, jestModulesPath) : '';
		// const newSource = hasDependencies ? imports + '\n' + unwrappedSource : unwrappedSource;
		// const jsSource = tsJest.process(newSource, sourceFilePath);
		// const fixedJsSource = hasDependencies ? rewriteSourceMaps(jsSource, (map) => offsetSourceMapLines(map, -1)) : jsSource;

		// return fixedJsSource;
	}

	private analyzeClass(classDeclaration: ClassDeclaration, level: number = 0): ClassInfo {
		const baseClass = classDeclaration.getBaseClass();

		return {
			name: classDeclaration.getName(),
			base: this.analyzeBase(baseClass, level),
		};
	}

	private analyzeBase(baseClass: ClassDeclaration, level: number): ClassInfo {
		if (!baseClass) return null;

		if (level > 5) return { name: 'Out of Recursive // TODO', base: null }; //TODO

		return this.analyzeClass(baseClass, level + 1);
	}

	private findAllExports(project: Project) {
		const allFiles = project.getSourceFiles();
		let allExports = {};
		for (const oneFile of allFiles) {
			allExports = {
				...allExports,
				...this.findModuleExports(oneFile),
			};
		}
		return allExports;
	}

	private findModuleExports(oneFile) {
		if (oneFile.isDeclarationFile() || oneFile.isFromExternalLibrary() || oneFile.isInNodeModules()) {
			return;
		}

		const path = oneFile.getFilePath();
		const namespaces = oneFile.getNamespaces();
		let allExports = {};

		for (const ns of namespaces) {
			allExports = {
				...allExports,
				...this.findNamespaceExports(path, ns),
			};
		}

		return allExports;
	}

	private findNamespaceExports(path, ns, rootModuleName = null) {
		const myModuleName = rootModuleName || ns.getName();
		const exports = ns.getExportedDeclarations();
		const allExports = {};

		exports.forEach((refs, key) => {
			for (const ref of refs) {
				const refPath = ref.getSourceFile().getFilePath();
				if (refPath !== path) {
					continue;
				}

				if (Node.isNamespaceDeclaration(ref)) {
					this.findNamespaceExports(path, ref, myModuleName);
					continue;
				}

				if (!ref.hasExportKeyword || !ref.hasExportKeyword()) {
					continue;
				}

				const refNamespace = this.getTopNamespace(ref);
				if (!refNamespace || refNamespace.getName() !== myModuleName) {
					continue;
				}

				allExports[myModuleName + '.' + key] = path;
			}
		});

		return allExports;
	}

	private getTopNamespace(ofNode) {
		let current = ofNode;
		let topMostNamespaceNode;

		while (current) {
			if (Node.isNamespaceDeclaration(current)) {
				topMostNamespaceNode = current;
			}
			current = current.getParent();
		}

		return topMostNamespaceNode;
	}

	private findDependencies(allExports, myModuleName, mySourceFilePath, moduleBlock) {
		const moduleDependencies = new Set();
		const dependencyDescriptorsToProcess = [];
		const identifierReplacementDescriptors = [];

		moduleBlock.forEachDescendant((node, traversal) => {
			if (Node.isTypeReferenceNode(node)) {
				const descriptor = this.tryGetDependencyDescriptor(allExports, myModuleName, mySourceFilePath, node);
				if (descriptor) dependencyDescriptorsToProcess.push(descriptor);
				traversal.skip();
			} else if (Node.isPropertyAccessExpression(node) || Node.isQualifiedName(node)) {
				const descriptor = this.tryGetDependencyDescriptor(allExports, myModuleName, mySourceFilePath, node);
				if (descriptor) {
					dependencyDescriptorsToProcess.push(descriptor);
					traversal.skip();
				}
			} else if (Node.isIdentifier(node)) {
				const parent = node.getParent();
				const isPartOfPropertyAccess = Node.isPropertyAccessExpression(parent);
				const isStartOfPropertyAccess = isPartOfPropertyAccess && parent.getChildAtIndex(0) === node;
				if (!isPartOfPropertyAccess || isStartOfPropertyAccess) {
					const descriptor = this.tryGetDependencyDescriptor(allExports, myModuleName, mySourceFilePath, node);
					if (descriptor) {
						dependencyDescriptorsToProcess.push(descriptor);
					}
					if (isPartOfPropertyAccess) traversal.up();
				}
			}
		});

		for (const dependencyDescriptor of dependencyDescriptorsToProcess) {
			const { node, identifier, fullIdentifier, isMyModule } = dependencyDescriptor;

			const fullIdentifierParts = fullIdentifier.split('.');
			/// Note that the original identifier can be something like "Module.Something", resolved to full identifier "Root.Module.Something", unqualified identifier being "Something".
			const unqualifiedIdentifier = fullIdentifierParts[fullIdentifierParts.length - 1];
			const newIdentifier = fullIdentifierParts.join('_');

			if (!isMyModule) {
				moduleDependencies.add(newIdentifier);
			}

			if (fullIdentifierParts.length > 1) {
				/// Inflate is how longer the new identifier is, this inflates the source file text, used for later calculations of module text boundaries.
				const inflate = newIdentifier.length - identifier.length;
				identifierReplacementDescriptors.push({
					start: node.getStart(),
					end: node.getEnd(),
					newIdentifier,
					inflate,
				});
			}
		}

		return {
			dependencies: moduleDependencies,
			identifierReplacementDescriptors,
		};
	}

	private tryGetDependencyDescriptor(allExports, myModuleName, mySourceFilePath, node) {
		const identifier = node.getText();
		const dependencyInfo = this.tryResolveDependency(allExports, identifier, myModuleName);

		if (!dependencyInfo || typeof dependencyInfo.dependencyFilePath !== 'string') {
			return;
		}

		return {
			node,
			identifier,
			fullIdentifier: dependencyInfo.fullIdentifier,
			isMyModule: dependencyInfo.dependencyFilePath === mySourceFilePath,
		};
	}

	private tryResolveDependency(allExports, identifier, myModuleName) {
		let prefix = myModuleName + '.';

		do {
			const dependencyFilePath = allExports[prefix + identifier];

			if (dependencyFilePath) {
				return {
					fullIdentifier: prefix + identifier,
					dependencyFilePath,
				};
			}

			if (prefix === '') break;

			prefix = prefix.substr(0, prefix.lastIndexOf('.', prefix.length - 2) + 1);
		} while (true);
	}
}
