import { EventEmitter } from '@angular/core';
import { Link } from './link';
import { Node } from './node';
import { Simulation, forceLink, forceSimulation, forceManyBody, forceCenter } from 'd3';

const FORCES = {
	LINKS: 1 / 50,
	COLLISION: 1,
	CHARGE: -1
};

export class ForceDirectedGraph {
	public ticker: EventEmitter<Simulation<Node, Link>> = new EventEmitter();
	public simulation: Simulation<any, any>;

	public nodes: Node[] = [];
	public links: Link[] = [];

	constructor(nodes: Node[], links: Link[], options: { width: any, height: any }) {
		this.nodes = nodes;
		this.links = links;

		this.initSimulation(options);
	}

	initNodes() {
		if (!this.simulation) {
			throw new Error('simulation was not initialized yet');
		}

		this.simulation.nodes(this.nodes);
	}

	initLinks() {
		if (!this.simulation) {
			throw new Error('simulation was not initialized yet');
		}

		// Initializing the links force simulation
		this.simulation.force('links',
			forceLink(this.links)
				.strength(FORCES.LINKS)
		);
	}

	initSimulation(options: { width: any; height: any; }) {
		if (!options || !options.width || !options.height) {
			throw new Error('missing options when initializing simulation');
		}

		/** Creating the simulation */
		if (!this.simulation) {
			const ticker = this.ticker;

			// Creating the force simulation and defining the charges
			this.simulation = forceSimulation()
				.force('charge',
					forceManyBody()
						.strength(FORCES.CHARGE)
				);

			// Connecting the d3 ticker to an angular event emitter
			this.simulation.on('tick', function () {
				ticker.emit(this);
			});

			this.initNodes();
			this.initLinks();
		}

		/** Updating the central force of the simulation */
		this.simulation.force('centers', forceCenter(options.width / 2, options.height / 2));

		/** Restarting the simulation internal timer */
		this.simulation.restart();
	}
}
