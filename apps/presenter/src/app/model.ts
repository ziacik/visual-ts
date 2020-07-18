import { Node, Edge, ClusterNode } from '@swimlane/ngx-graph';

export class Model {
	constructor(
		public readonly nodes: Node[],
		public readonly edges: Edge[],
		public readonly clusters?: ClusterNode[],
	) {
	}
}
