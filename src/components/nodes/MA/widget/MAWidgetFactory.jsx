import { NodeWidgetFactory, DiagramEngine, NodeModel } from 'storm-react-diagrams';
import { MANodeWidgetFactory } from './MANodeWidget';

export class MAWidgetFactory extends NodeWidgetFactory {
	constructor() {
		super('MA');
	}

	generateReactWidget(diagramEngine: DiagramEngine, node: NodeModel) {
		return MANodeWidgetFactory({ node: node });
	}
}
