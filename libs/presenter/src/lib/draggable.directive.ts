import { Directive, Input, ElementRef, OnInit } from '@angular/core';
import { Presenter } from './presenter';
import { ForceDirectedGraph } from './force-directed-graph';
import { Node } from './node';

@Directive({
	selector: '[draggableNode]'
})
export class DraggableDirective implements OnInit {
	@Input('draggableNode') draggableNode: Node;
	@Input('draggableInGraph') draggableInGraph: ForceDirectedGraph;

	constructor(private d3Service: Presenter, private _element: ElementRef) { }

	ngOnInit() {
		this.d3Service.applyDraggableBehaviour(this._element.nativeElement, this.draggableNode, this.draggableInGraph);
	}
}
