import { AbstractInstanceFactory } from 'storm-react-diagrams';
import { MANodeModel } from './MANodeModel';
import { MAPortModel } from './MAPortModel';

export class MANodeFactory extends AbstractInstanceFactory {
	constructor() {
		super('MANodeModel');
	}

	getInstance(initialConfig?: any) {
		return new MANodeModel();
	}
}

export class MAPortFactory extends AbstractInstanceFactory {
	constructor() {
		super('MAPortModel');
	}

	getInstance(initialConfig?: any) {
		return new MAPortModel();
	}
}
