import { NodeModel } from 'storm-react-diagrams';
import { operatorPortModel } from './operatorPortModel';

export class operatorNodeModel extends NodeModel {
    name: string;

	constructor(name ?: string) {
		super('operator');
		this.addPort(new operatorPortModel('top'));
		this.addPort(new operatorPortModel('left'));
		this.addPort(new operatorPortModel('bottom'));
		this.addPort(new operatorPortModel('right'));

		this.name = name;
	}
}
