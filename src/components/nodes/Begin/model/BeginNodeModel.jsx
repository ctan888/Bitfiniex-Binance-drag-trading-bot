import { NodeModel } from 'storm-react-diagrams';
import { BeginPortModel } from './BeginPortModel';

export class BeginNodeModel extends NodeModel {
    name: string;

	constructor(name ?: string) {
		super('Begin');
		this.addPort(new BeginPortModel('top'));
		this.addPort(new BeginPortModel('left'));
		this.addPort(new BeginPortModel('bottom'));
		this.addPort(new BeginPortModel('right'));

		this.name = name;
	}
}
