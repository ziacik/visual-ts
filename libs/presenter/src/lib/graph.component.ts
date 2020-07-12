import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { ForceDirectedGraph } from './force-directed-graph';
import { Presenter } from './presenter';
import { Link } from './link';
import { Node } from './node';

@Component({
	selector: 'visual-ts-graph',
	template: `
	  <svg #svg [attr.width]="options.width" [attr.height]="options.height">
		<g [zoomableOf]="svg">
		  <g [linkVisual]="link" *ngFor="let link of links"></g>
		  <g [nodeVisual]="node" *ngFor="let node of nodes"></g>
		</g>
	  </svg>
	`,
	styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit, AfterViewInit {
	@Input() nodes: Node[];
	@Input() links: Link[];

	graph: ForceDirectedGraph;
	private _options: { width: any, height: any } = { width: 1200, height: 1200 };

	constructor(private presenter: Presenter) { }

	ngOnInit() {
		/** Receiving an initialized simulated graph from our custom d3 service */
		this.graph = this.presenter.getForceDirectedGraph(this.nodes, this.links, this.options);
	}

	ngAfterViewInit() {
		this.graph.initSimulation(this.options);
	}


	get options() {
		return this._options = {
			width: window.innerWidth,
			height: window.innerHeight
		};
	}
}
