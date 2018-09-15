import { NodeWidgetFactory, DiagramEngine, NodeModel } from 'storm-react-diagrams';
import { DiamonNodeWidgetFactory } from './DiamondNodeWidget';

export class DiamondWidgetFactory extends NodeWidgetFactory {
	constructor() {
		super('Diamond');
	}

	generateReactWidget(diagramEngine: DiagramEngine, node: NodeModel) {
		return DiamonNodeWidgetFactory({ node: node });
	}
}
