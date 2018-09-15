import { NodeWidgetFactory, DiagramEngine, NodeModel } from 'storm-react-diagrams';
import { BeginNodeWidgetFactory } from './BeginNodeWidget';

export class BeginWidgetFactory extends NodeWidgetFactory {
	constructor() {
		super('Begin');
	}

	generateReactWidget(diagramEngine: DiagramEngine, node: NodeModel) {
		return BeginNodeWidgetFactory({ node: node });
	}
}
