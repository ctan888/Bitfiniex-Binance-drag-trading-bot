import { BeginNodeModel } from '../model/BeginNodeModel';
import { NodeModel, PortWidget } from 'storm-react-diagrams';

import React from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export interface BeginNodeWidgetProps {
	node: BeginNodeModel,
	size?: number
}

export interface BeginNodeWidgetState {}

export class BeginNodeWidget extends React.Component<BeginNodeWidgetProps, BeginNodeWidgetState> {

	constructor(props: BeginNodeWidgetProps) {
		super(props);
		this.state = {
			modal: false
		};
		this.toggleModal = this.toggleModal.bind(this);
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
				(40 + this.props.size/1.2) + ',' + ((20 + this.props.size/1.2)) + ' ' +
				10 + ',' + ((20 + this.props.size/1.2)) +
				'" fill="red" stroke="#000000" stroke-width="3" stroke-miterlimit="10"/>'
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

    			{/* 文字说明 */}
				<div style={{
				        position: 'absolute',
                        left: this.props.size/2.3-50,
                        top: this.props.size/10}}>
					开始
				</div>

				{/*下端点*/}
                {/* define port: bottom */}
				<div
					style={{
						position: 'absolute',
						zIndex: 10,
						left: this.props.size /2,
						top: this.props.size + 8
					}}
				>
					<PortWidget name="right" node={this.props.node} />
				</div>

			</div>
		);
	}
}

BeginNodeWidget.defaultProps = {
	size: 150,
	node: null
};

export var BeginNodeWidgetFactory = React.createFactory(BeginNodeWidget);
