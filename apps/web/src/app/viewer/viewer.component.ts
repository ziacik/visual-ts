import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Presenter, Link, Node } from '@visual-ts/presenter';

@Component({
	selector: 'visual-ts-viewer',
	templateUrl: './viewer.component.html',
	styleUrls: ['./viewer.component.scss'],
})
export class ViewerComponent implements AfterViewInit {
	nodes: Node[];
	links: Link[];

	constructor(private presenter: Presenter) {
		this.nodes = [];
		this.links = [];

		const N = 10;
		const getIndex = number => number - 1;

		/** constructing the nodes array */
		for (let i = 1; i <= N; i++) {
			this.nodes.push(new Node(i));
		}

		for (let i = 1; i <= N; i++) {
			for (let m = 2; i * m <= N; m++) {
				/** increasing connections toll on connecting nodes */
				const node1 = this.nodes[getIndex(i)];
				const node2 = this.nodes[getIndex(i * m)];
				node1.linkCount++;
				node2.linkCount++;

				/** connecting the nodes before starting the simulation */
				this.links.push(new Link(i, i * m));
			}
		}
	}

	ngAfterViewInit(): void {
	}

}
