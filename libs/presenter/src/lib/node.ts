import { SimulationNodeDatum } from 'd3';

export class Node implements SimulationNodeDatum {
	index?: number;
	x?: number;
	y?: number;
	vx?: number;
	vy?: number;
	fx?: number | null;
	fy?: number | null;

	id: string;

	constructor(id: string) {
		this.id = id;
	}
}
