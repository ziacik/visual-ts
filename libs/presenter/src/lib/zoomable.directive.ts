import { Directive, Input, ElementRef, OnInit } from '@angular/core';
import { Presenter } from './presenter';

@Directive({
	selector: '[zoomableOf]'
})
export class ZoomableDirective implements OnInit {
	@Input('zoomableOf') zoomableOf: ElementRef;

	constructor(private d3Service: Presenter, private _element: ElementRef) { }

	ngOnInit() {
		this.d3Service.applyZoomableBehaviour(this.zoomableOf, this._element.nativeElement);
	}
}
