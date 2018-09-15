import { operatorNodeModel } from '../model/operatorNodeModel';
import { NodeModel, PortWidget } from 'storm-react-diagrams';

import React from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export interface operatorNodeWidgetProps {
	size?: number
}

export interface operatorNodeWidgetState {}

export class operatorNodeWidget extends React.Component<operatorNodeWidgetProps, operatorNodeWidgetState> {

	constructor(props: operatorNodeWidgetProps) {
		super(props);
		this.state = {
			kind: ">",
		};
		this.kindChange = this.kindChange.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
	}

	periodChange(event) {
		this.setState({period: event.target.value});
	}

	unitChange(event) {
		this.setState({unit: event.target.value});
	}

	kindChange(event){
		this.setState({kind: event.target.value})
	}

	arithChange(event){
		this.setState({arith: event.target.value})
	}

    toggleModal() {
        this.setState({
            modal: !this.state.modal,
        });
    }

	createMarkup() {
		return {
            // language=HTML
            __html:
				'<g id="Layer_1"></g>' +
				'<g id="Layer_2">' +
                '<polygon points="10,' + 10 + ' ' +
				(this.props.size/2) + ',10 ' +
				(this.props.size/2) + ',' + (this.props.size/2) + ' ' +
				10 + ',' + (this.props.size/2) +
				'" fill="LightCyan" stroke="#000000" stroke-width="3" stroke-miterlimit="10"/>'
		};
	}

	render() {
		return (
			<div
				className="operator-node"
				style={{ position: 'relative', width: this.props.size*1.2, height: this.props.size }}
			>
                {/* define the shape and color */}
				<svg
                    width="300"
                    height="300"
                    dangerouslySetInnerHTML={this.createMarkup()}
                    style={{left: 0}}
                />

    			
    			{/*MODAL*/}
    			<Modal isOpen={this.state.modal} toggle={this.toggleModal} className={'node-modal'}>
                    <ModalHeader toggle={this.toggleModal}>更改关系符号</ModalHeader>
                    <ModalBody>
	                	<div class="input-group">
		      				{/* 选择符号 */}
							<select value={this.state.kind} onChange={this.kindChange}
								class="selectpicker show-tick form-control" data-live-search="true">  
							  <option>{">"}</option>  
							  <option>{">="}</option>  
							  <option>{"<"}</option>  
							  <option>{"<="}</option>  
							  <option>{"="}</option>  
							</select>
    					</div>
	                </ModalBody>
					<ModalFooter>
                        <Button color="primary" onClick={this.toggleModal}>Save</Button>{' '}
                        <Button color="danger" onClick={this.toggleModal}>Delete</Button>{' '}
                        <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>

    			{/*上方周期更改按钮*/}
    			<div class="input-group" color = "green" style={{
							        position: 'middle',
							       	left: 10,
    			                    top: -20}}>
    			    <button color="success" onClick={this.toggleModal}>
    			    	{'修改'}
      				</button>
    			</div>

    			{/* 文字说明 */}
				<div style={{
				        position: 'absolute',
                        left: (10 + this.props.size/2)/2-8,
                        top: (10 + this.props.size/2)/2 -8}}>
					{this.state.kind}
				</div>

				{/*左下端点*/}
                {/* define port: left */}
				<div style={{
				        position: 'absolute',
                        zIndex: 10,
                        left: -8,
                        top: this.props.size / 2 - 8 }}>
					<PortWidget name="left" node={this.props.node} />

				</div>

				{/*右下端点*/}
                {/* define port: right */}
				<div
					style={{
						position: 'absolute',
						zIndex: 10,
						left: this.props.size/2,
						top: this.props.size / 2 - 8
					}}
				>
					<PortWidget name="right" node={this.props.node} />
				</div>

			</div>
		);
	}
}

operatorNodeWidget.defaultProps = {
	size: 150,
	node: null
};

export var operatorNodeWidgetFactory = React.createFactory(operatorNodeWidget);
