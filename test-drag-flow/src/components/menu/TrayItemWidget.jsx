import React from 'react';

export interface TrayItemWidgetProps {
	model: any,
	color?: string,
	name: string
}

export interface TrayItemWidgetState {}

export default class TrayItemWidget extends React.Component<TrayItemWidgetProps, TrayItemWidgetState> {
	constructor(props: TrayItemWidgetProps) {
		super(props);
		this.state = {};
	}

	onDragStartHandler(event) {
        event.dataTransfer.setData('storm-diagram-node', JSON.stringify(this.props.model));
    }

	render() {
		return (
			<div
				style={{ background: this.props.color }}
				draggable={true}
				onDragStart = {this.onDragStartHandler.bind(this)}
				className="tray-item"
			>
				{this.props.name}
			</div>
		);
	}
}
