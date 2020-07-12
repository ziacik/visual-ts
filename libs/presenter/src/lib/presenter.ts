import { Injectable } from '@angular/core';
import { Link } from './link';
import { Node } from './node';
import { ForceDirectedGraph } from './force-directed-graph';
import { select, event, zoom } from 'd3';

export interface ClassInfo {
	name: string;
	base: ClassInfo;
}

@Injectable()
export class Presenter {
	present(classInfo: ClassInfo, svgElement: HTMLElement) {
		// const g = new dagreD3.graphlib.Graph().setGraph({});

		// g.setNode('house', { label: 'house' });
		// g.setNode('rect', { label: 'rect' });
		// g.setEdge('house', 'rect', { arrowhead: 'normal' });

		// const svg = d3.select(svgElement);
		// console.log('ASDF', svg);
		// const inner = svg.select('g');

		// const zoom = d3.zoom().on('zoom', function () {
		// 	inner.attr('transform', d3.event.transform);
		// });
		// svg.call(zoom);

		// // Create the renderer
		// const render = new dagreD3.render();

		// // Run the renderer. This is what draws the final graph.
		// render(inner as any, g); // todo any

		// // Center the graph
		// const initialScale = 0.75;
		// svg.call(zoom.transform, d3.zoomIdentity.translate((+svg.attr('width') - g.graph().width * initialScale) / 2, 20).scale(initialScale));

		// svg.attr('height', g.graph().height * initialScale + 40);
		// return svg.html();
	}

	getForceDirectedGraph(nodes: Node[], links: Link[], options: { width: any, height: any }) {
		return new ForceDirectedGraph(nodes, links, options);
	}

	applyZoomableBehaviour(svgElement, containerElement) {
		let svg, container, zoomed, zoomFunc;

		svg = select(svgElement);
		container = select(containerElement);

		zoomed = () => {
			const transform = event.transform;
			container.attr('transform', 'translate(' + transform.x + ',' + transform.y + ') scale(' + transform.k + ')');
		};

		zoomFunc = zoom().on('zoom', zoomed);
		svg.call(zoomFunc);
	}
}
