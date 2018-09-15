import { NodeModel } from 'storm-react-diagrams';
import { DiamondPortModel } from './DiamondPortModel';

export class DiamondNodeModel extends NodeModel {
    name: string;

	constructor(name ?: string) {
		super('Diamond');
		this.addPort(new DiamondPortModel('top'));
		this.addPort(new DiamondPortModel('left'));
		this.addPort(new DiamondPortModel('bottom'));
		this.addPort(new DiamondPortModel('right'));

		this.name = name;
	}
}
