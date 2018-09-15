import { NodeModel } from 'storm-react-diagrams';
import { MAPortModel } from './MAPortModel';

export class MANodeModel extends NodeModel {
    name: string;

	constructor(name ?: string) {
		super('MA');
		this.addPort(new MAPortModel('top'));
		this.addPort(new MAPortModel('left'));
		this.addPort(new MAPortModel('bottom'));
		this.addPort(new MAPortModel('right'));

		this.name = name;
	}
}
