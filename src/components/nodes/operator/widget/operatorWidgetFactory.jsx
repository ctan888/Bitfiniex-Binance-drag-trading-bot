import { NodeWidgetFactory, DiagramEngine, NodeModel } from 'storm-react-diagrams';
import { operatorNodeWidgetFactory } from './operatorNodeWidget';

export class operatorWidgetFactory extends NodeWidgetFactory {
	constructor() {
		super('operator');
	}

	generateReactWidget(diagramEngine: DiagramEngine, node: NodeModel) {
		return operatorNodeWidgetFactory({ node: node });
	}
}
