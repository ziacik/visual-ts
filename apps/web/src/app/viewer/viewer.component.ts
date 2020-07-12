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
		this.nodes = [new Node('kvak'), new Node('blak'), new Node('blak'), new Node('blakx')];
		this.links = [new Link(this.nodes[0], this.nodes[1])];
	}

	ngAfterViewInit(): void {
	}

}
