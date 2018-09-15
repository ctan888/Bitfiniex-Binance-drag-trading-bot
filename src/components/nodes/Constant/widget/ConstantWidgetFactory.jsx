import { NodeWidgetFactory, DiagramEngine, NodeModel } from 'storm-react-diagrams';
import { ConstantNodeWidgetFactory } from './ConstantNodeWidget';

export class ConstantWidgetFactory extends NodeWidgetFactory {
	constructor() {
		super('Constant');
	}

	generateReactWidget(diagramEngine: DiagramEngine, node: NodeModel) {
		return ConstantNodeWidgetFactory({ node: node });
	}
}
