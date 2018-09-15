import { AbstractInstanceFactory } from 'storm-react-diagrams';
import { operatorNodeModel } from './operatorNodeModel';
import { operatorPortModel } from './operatorPortModel';

export class operatorNodeFactory extends AbstractInstanceFactory {
	constructor() {
		super('operatorNodeModel');
	}

	getInstance(initialConfig?: any) {
		return new operatorNodeModel();
	}
}

export class operatorPortFactory extends AbstractInstanceFactory {
	constructor() {
		super('operatorPortModel');
	}

	getInstance(initialConfig?: any) {
		return new operatorPortModel();
	}
}
