import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Presenter } from '@visual-ts/presenter';

@Component({
	selector: 'visual-ts-viewer',
	templateUrl: './viewer.component.html',
	styleUrls: ['./viewer.component.scss'],
})
export class ViewerComponent implements AfterViewInit {
	@ViewChild('svg')
	svg: ElementRef;

	constructor(private presenter: Presenter) {}

	ngAfterViewInit(): void {
		this.presenter.present(null, this.svg.nativeElement);
	}

}
