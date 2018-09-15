import React from 'react';
import { DiamondNodeModel } from '../model/DiamondNodeModel';
import { PortWidget } from 'storm-react-diagrams';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';

export interface DiamondNodeWidgetProps {
	node: DiamondNodeModel,
	size?: number
}

export interface DiamonNodeWidgetState {}

export class DiamonNodeWidget extends React.Component<DiamondNodeWidgetProps, DiamonNodeWidgetState> {
	constructor(props: DiamondNodeWidgetProps) {
		super(props);
		this.state = {};
	}

	createMarkup() {
		return {
            // language=HTML
            __html:
				'<g id="Layer_1"></g>' +
				'<g id="Layer_2">' +
                '<polygon points="10,' + this.props.size / 2 +
				' ' +
				this.props.size / 2 + ',10 ' +

				(this.props.size - 10) + ',' + this.props.size / 2 +
				' ' +
				this.props.size / 2 + ',' + (this.props.size - 10) +
				
				'" fill="yellow" stroke="#000000" stroke-width="3" stroke-miterlimit="10"/>' +
				'<text x=' +
				(this.props.size / 6) +
				' y=' +
				(this.props.size / 2+5) +
				'>-----买入-----></text></g>'
		};
	}

	render() {
		return (
			<div
				className="diamond-node"
				style={{ position: 'relative', width: this.props.size, height: this.props.size }}
			>
                {/* define the shape and color */}
				<svg
                    width="150"
                    height="150"
                    dangerouslySetInnerHTML={this.createMarkup()}
                    style={{left: 0}}
                />


                {/* define port: left */}
				<div style={{
				        position: 'absolute',
                        zIndex: 10,
                        left: -8,
                        top: this.props.size / 2 - 8 }}>
					<PortWidget name="left" node={this.props.node} />
				</div>
				
				
				<InputGroup style={{
				        position: 'absolute',
                        zIndex: 10,
                        top: -32 }}>
        			<Input placeholder="数量" type="number" step="1" />
        			<InputGroupAddon addonType="append">个</InputGroupAddon>
      			</InputGroup>


                {/* define port: right */}
				<div
					style={{
						position: 'absolute',
						zIndex: 10,
						left: this.props.size - 8,
						top: this.props.size / 2 - 8
					}}
				>
					<PortWidget name="right" node={this.props.node} />
				</div>

				{/* 交易对 */}
                {/* select pair*/}
				<div 					
					style={{
						position: 'absolute',
						zIndex: 10,

						top: this.props.size - 8
					}}>  
				  <select class="selectpicker show-tick form-control" data-live-search="true">  
				    <option>选择交易对</option>  
				    <option>BTC/USDT</option>  
				    <option>ETH/USDT</option>  
				    <option>LTC/USDT</option>  
				    <option>BCH/USDT</option>  
				    <option>IOST/BTC</option>  
				  </select>  
				</div>  
			</div>
		);
	}
}

DiamonNodeWidget.defaultProps = {
	size: 150,
	node: null
};

export var DiamonNodeWidgetFactory = React.createFactory(DiamonNodeWidget);
