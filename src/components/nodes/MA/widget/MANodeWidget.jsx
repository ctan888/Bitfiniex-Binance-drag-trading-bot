import { MANodeModel } from '../model/MANodeModel';
import { NodeModel, PortWidget } from 'storm-react-diagrams';

import React from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export interface MANodeWidgetProps {
	node: MANodeModel,
	size?: number
}

export interface MANodeWidgetState {}

export class MANodeWidget extends React.Component<MANodeWidgetProps, MANodeWidgetState> {

	constructor(props: MANodeWidgetProps) {
		super(props);
		this.state = {
			period : 5,
			unit : '日',
			modal: false,
			relation: null, 
			object: null,
			pair: "BTC/USDT",
			arith: null,
		};
		this.periodChange = this.periodChange.bind(this);
		this.unitChange = this.unitChange.bind(this);
		this.pairChange = this.pairChange.bind(this);
		this.arithChange = this.arithChange.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
	}

	periodChange(event) {
		this.setState({period: event.target.value});
	}

	unitChange(event) {
		this.setState({unit: event.target.value});
	}

	pairChange(event){
		this.setState({pair: event.target.value})
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
				(40 + this.props.size/1.2) + ',10 ' +
				(40 + this.props.size/1.2) + ',' + ((40 + this.props.size/1.2)/2) + ' ' +
				10 + ',' + ((40 + this.props.size/1.2)/2) +
				'" fill="green" stroke="#000000" stroke-width="3" stroke-miterlimit="10"/>'
		};
	}

	render() {
		return (
			<div
				className="MA-node"
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
							{/*输入框*/}
							<Input type="text" value={this.state.period} onChange={this.periodChange}/>
    			  			{/*周期*/}
							<select value={this.state.unit} onChange={this.unitChange} 
								class="selectpicker show-tick form-control" data-live-search="true">    
					  			<option>分钟</option>  
					  			<option>日</option> 
							</select>  
    					</div>
	                </ModalBody>

	            	{/*计算*/}
					<ModalHeader> 调整数值(输入算术表达式, 用小写x表示本均线的值,（如x*1.01，((x+1)*0.2)) </ModalHeader>
					<ModalBody>
						<Input type="text" value={this.state.arith} onChange={this.arithChange}/>
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
					{this.state.pair} {this.state.period}{this.state.unit}均线{this.state.arith}
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

MANodeWidget.defaultProps = {
	size: 150,
	node: null
};

export var MANodeWidgetFactory = React.createFactory(MANodeWidget);
