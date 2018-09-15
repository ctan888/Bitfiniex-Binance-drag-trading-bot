import { AbstractInstanceFactory } from 'storm-react-diagrams';
import { BeginNodeModel } from './BeginNodeModel';
import { BeginPortModel } from './BeginPortModel';

export class BeginNodeFactory extends AbstractInstanceFactory {
	constructor() {
		super('BeginNodeModel');
	}

	getInstance(initialConfig?: any) {
		return new BeginNodeModel();
	}
}

export class BeginPortFactory extends AbstractInstanceFactory {
	constructor() {
		super('BeginPortModel');
	}

	getInstance(initialConfig?: any) {
		return new BeginPortModel();
	}
}
