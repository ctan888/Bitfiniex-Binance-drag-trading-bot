import { AbstractInstanceFactory } from 'storm-react-diagrams';
import { ConstantNodeModel } from './ConstantNodeModel';
import { ConstantPortModel } from './ConstantPortModel';

export class ConstantNodeFactory extends AbstractInstanceFactory {
	constructor() {
		super('ConstantNodeModel');
	}

	getInstance(initialConfig?: any) {
		return new ConstantNodeModel();
	}
}

export class ConstantPortFactory extends AbstractInstanceFactory {
	constructor() {
		super('ConstantPortModel');
	}

	getInstance(initialConfig?: any) {
		return new ConstantPortModel();
	}
}
