import { Injectable } from '@angular/core';
import { Link } from './link';
import { Node } from './node';
import { ForceDirectedGraph } from './force-directed-graph';
import { select, event, zoom, drag } from 'd3';

export interface ClassInfo {
	name: string;
	base: ClassInfo;
}

@Injectable()
export class Presenter {
	present(classInfo: ClassInfo, svgElement: HTMLElement) {
		// const g = new dagregraphlib.Graph().setGraph({});

		// g.setNode('house', { label: 'house' });
		// g.setNode('rect', { label: 'rect' });
		// g.setEdge('house', 'rect', { arrowhead: 'normal' });

		// const svg = select(svgElement);
		// console.log('ASDF', svg);
		// const inner = svg.select('g');

		// const zoom = zoom().on('zoom', function () {
		// 	inner.attr('transform', event.transform);
		// });
		// svg.call(zoom);

		// // Create the renderer
		// const render = new dagrerender();

		// // Run the renderer. This is what draws the final graph.
		// render(inner as any, g); // todo any

		// // Center the graph
		// const initialScale = 0.75;
		// svg.call(zoom.transform, zoomIdentity.translate((+svg.attr('width') - g.graph().width * initialScale) / 2, 20).scale(initialScale));

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

	/** A method to bind a draggable behaviour to an svg element */
	applyDraggableBehaviour(element, node: Node, graph: ForceDirectedGraph) {
		const d3element = select(element);

		function started() {
			/** Preventing propagation of dragstart to parent elements */
			event.sourceEvent.stopPropagation();

			if (!event.active) {
				graph.simulation.alphaTarget(0.3).restart();
			}

			event.on('drag', dragged).on('end', ended);

			function dragged() {
				node.fx = event.x;
				node.fy = event.y;
			}

			function ended() {
				if (!event.active) {
					graph.simulation.alphaTarget(0);
				}

				node.fx = null;
				node.fy = null;
			}
		}

		d3element.call(drag()
			.on('start', started));
	}
}
