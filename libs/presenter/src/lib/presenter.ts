import * as dagreD3 from 'dagre-d3';
import * as d3 from 'd3';
import { JSDOM } from 'jsdom';
import { Injectable } from '@angular/core';

export interface ClassInfo {
	name: string;
	base: ClassInfo;
}

@Injectable()
export class Presenter {
	present(classInfo: ClassInfo, svgElement: HTMLElement): string {
		const g = new dagreD3.graphlib.Graph().setGraph({});

		g.setNode('house', { label: 'house' });
		g.setNode('rect', { label: 'rect' });
		g.setEdge('house', 'rect', { arrowhead: 'normal' });

		const svg = d3.select(svgElement);
		console.log('ASDF', svg);
		const inner = svg.select('g');

		const zoom = d3.zoom().on('zoom', function () {
			inner.attr('transform', d3.event.transform);
		});
		svg.call(zoom);

		// Create the renderer
		const render = new dagreD3.render();

		// Run the renderer. This is what draws the final graph.
		render(inner as any, g); // todo any

		// Center the graph
		const initialScale = 0.75;
		svg.call(zoom.transform, d3.zoomIdentity.translate((+svg.attr('width') - g.graph().width * initialScale) / 2, 20).scale(initialScale));

		svg.attr('height', g.graph().height * initialScale + 40);
		return svg.html();
	}
}
