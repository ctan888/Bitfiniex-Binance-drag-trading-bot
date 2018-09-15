import { NodeModel } from 'storm-react-diagrams';
import { ConstantPortModel } from './ConstantPortModel';

export class ConstantNodeModel extends NodeModel {
    name: string;

	constructor(name ?: string) {
		super('Constant');
		this.addPort(new ConstantPortModel('top'));
		this.addPort(new ConstantPortModel('left'));
		this.addPort(new ConstantPortModel('bottom'));
		this.addPort(new ConstantPortModel('right'));

		this.name = name;
	}
}
