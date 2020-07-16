import { Component, Input } from '@angular/core';
import { Node } from './node';

@Component({
	selector: '[nodeVisual]',
	template: `
	<svg:g [attr.transform]="'translate(' + node.x + ',' + node.y + ')'">
	<svg:rect
		class="node"
		[attr.fill]="node.color"
		x="-50"
		y="-25"
		width="100"
		height="50">
	</svg:rect>
	<svg:text
		class="node-name"
		[attr.font-size]="node.fontSize">
	  Kvak {{node.id}}
	</svg:text>
	</svg:g>
`,
	styleUrls: ['./node-visual.component.css']
})
export class NodeVisualComponent {
	@Input('nodeVisual') node: Node;
}
