import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DraggableDirective } from './draggable.directive';
import { GraphComponent } from './graph.component';
import { LinkVisualComponent } from './link-visual.component';
import { NodeVisualComponent } from './node-visual.component';
import { Presenter } from './presenter';
import { ZoomableDirective } from './zoomable.directive';

@NgModule({
	imports: [CommonModule],
	providers: [Presenter],
	declarations: [GraphComponent, LinkVisualComponent, NodeVisualComponent, ZoomableDirective, DraggableDirective],
	exports: [GraphComponent, LinkVisualComponent, NodeVisualComponent]
})
export class PresenterModule { }
