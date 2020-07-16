import { SimulationLinkDatum } from 'd3';
import { Node } from './node';

// Implementing SimulationLinkDatum interface into our custom Link class
export class Link implements SimulationLinkDatum<Node> {
	// Optional - defining optional implementation properties - required for relevant typing assistance
	index?: number;

	// Must - defining enforced implementation properties
	source: Node;
	target: Node;

	constructor(source: any, target: any) {
		this.source = source;
		this.target = target;
	}
}
