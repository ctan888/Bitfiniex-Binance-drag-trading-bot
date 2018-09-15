import { ConstantNodeModel } from '../model/ConstantNodeModel';
import { NodeModel, PortWidget } from 'storm-react-diagrams';

import React from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export interface ConstantNodeWidgetProps {
	node: ConstantNodeModel,
	size?: number
}

export interface ConstantNodeWidgetState {}

export class ConstantNodeWidget extends React.Component<ConstantNodeWidgetProps, ConstantNodeWidgetState> {

	constructor(props: ConstantNodeWidgetProps) {
		super(props);
		this.state = {
			period : 5,
			constKind : "自定义价格",
			modal: false,
			pair: "BTC/USDT",
			constValue: null,
		};
		this.periodChange = this.periodChange.bind(this);
		this.unitChange = this.unitChange.bind(this);
		this.pairChange = this.pairChange.bind(this);
		this.constValueChange = this.constValueChange.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
	}

	periodChange(event) {
		this.setState({period: event.target.value});
	}

	unitChange(event) {
		this.setState({constKind: event.target.value});
	}

	pairChange(event){
		this.setState({pair: event.target.value})
	}

	constValueChange(event){
		this.setState({constValue: event.target.value})
	}

    toggleModal() {
        this.setState({
            modal: !this.state.modal,
        });
    }

	createConstantrkup() {
		return {
            // language=HTML
            __html:
				'<g id="Layer_1"></g>' +
				'<g id="Layer_2">' +
                '<polygon points="10,' + 10 + ' ' +
				(40 + this.props.size/1.2) + ',10 ' +
				(40 + this.props.size/1.2) + ',' + ((40 + this.props.size/1.2)/2) + ' ' +
				10 + ',' + ((40 + this.props.size/1.2)/2) +
				'" fill="bisque" stroke="#000000" stroke-width="3" stroke-miterlimit="10"/>'
		};
	}

	render() {
		return (
			<div
				className="Constant-node"
				style={{ position: 'relative', width: this.props.size*1.2, height: this.props.size }}
			>
                {/* define the shape and color */}
				<svg
                    width="300"
                    height="300"
                    dangerouslySetInnerHTML={this.createConstantrkup()}
                    style={{left: 0}}
                />

    			
    			{/*MODAL*/}
    			<Modal isOpen={this.state.modal} toggle={this.toggleModal} className={'node-modal'}>
                    <ModalHeader toggle={this.toggleModal}>更改交易对与周期</ModalHeader>
                    <ModalBody>

	                	<div class="input-group">
		      				{/* 选择交易对 */}
							<select value={this.state.pair} onChange={this.pairChange}
								class="selectpicker show-tick form-control" data-live-search="true">  
							  <option>BTC/USDT</option>  
							  <option>ETH/USDT</option>  
							  <option>LTC/USDT</option>  
							  <option>BCH/USDT</option>  
							  <option>IOST/BTC</option>  
							</select>  
    			  			{/*常数*/}
							<select value={this.state.constKind} onChange={this.unitChange} 
								class="selectpicker show-tick form-control" data-live-search="true">    
					  			<option>实时价格</option>  
					  			<option>自定义价格</option> 
							</select>  
    					</div>
	                </ModalBody>

	            	{/*输入*/}
					<ModalHeader> 输入价格 </ModalHeader>
					<ModalBody>
						<Input type="text" value={this.state.constValue} onChange={this.constValueChange}/>
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
                        left: this.props.size/2.3-50,
                        top: this.props.size/10}}>
					{this.state.pair} {this.state.constKind}{this.state.constValue}
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

				{/*上端点*/}
                {/* define port: top */}
				<div style={{
				        position: 'absolute',
                        zIndex: 10,
                        left: this.props.size / 2,
                        top: this.props.size / 6 - 36 }}>
					<PortWidget name="top" node={this.props.node} />

				</div>
				

				{/*右下端点*/}
                {/* define port: right */}
				<div
					style={{
						position: 'absolute',
						zIndex: 10,
						left: this.props.size + 16,
						top: this.props.size / 2 - 8
					}}
				>
					<PortWidget name="right" node={this.props.node} />
				</div>

			</div>
		);
	}
}

ConstantNodeWidget.defaultProps = {
	size: 150,
	node: null
};

export var ConstantNodeWidgetFactory = React.createFactory(ConstantNodeWidget);
