import {
    DiagramWidget,
    DiagramEngine,
    DefaultNodeFactory,
    DefaultLinkFactory,
    DefaultNodeModel,
    DefaultPortModel,
    NodeModel
} from "storm-react-diagrams";
import React, {Component} from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Lodash from 'lodash';

import TrayWidget from '../../components/menu/TrayWidget.jsx';
import TrayItemWidget from '../../components/menu/TrayItemWidget.jsx';
import {DiamondNodeModel} from '../../components/nodes/Diamond/model/DiamondNodeModel.jsx';
import {DiamondWidgetFactory} from "../../components/nodes/Diamond/widget/DiamondWidgetFactory.jsx";
import {MANodeModel} from '../../components/nodes/MA/model/MANodeModel.jsx';
import {MAWidgetFactory} from "../../components/nodes/MA/widget/MAWidgetFactory.jsx";
import {operatorNodeModel} from '../../components/nodes/operator/model/operatorNodeModel.jsx';
import {operatorWidgetFactory} from "../../components/nodes/operator/widget/operatorWidgetFactory.jsx";
import {ConstantNodeModel} from '../../components/nodes/Constant/model/ConstantNodeModel.jsx';
import {ConstantWidgetFactory} from "../../components/nodes/Constant/widget/ConstantWidgetFactory.jsx";
import {BeginNodeModel} from '../../components/nodes/Begin/model/BeginNodeModel.jsx';
import {BeginWidgetFactory} from "../../components/nodes/Begin/widget/BeginWidgetFactory.jsx";
import '../../components/StormReactDiagrams/SRD.css';

class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            modalConfig: {
                description: 'no selected node',
            }
        };

        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        let modalConfig = this.state.modalConfig;
        let model = this.engine.getDiagramModel();
        let selectedItems = model.getSelectedItems();

        if(selectedItems.length > 0){
            let selectedItem = selectedItems[0];
            if (selectedItem instanceof NodeModel) {
                modalConfig.description = 'Editing Node "' + selectedItem.name + '"';
            } else {
                modalConfig.description = 'no selected node';
            }
        } else {
            modalConfig.description = 'no selected node';
        }

        this.setState({
            modal: !this.state.modal,
            modalConfig: modalConfig,
        });
    }

    componentWillMount() {
        this.engine = new DiagramEngine();
        this.engine.registerNodeFactory(new DefaultNodeFactory());
        this.engine.registerLinkFactory(new DefaultLinkFactory());
        this.engine.registerNodeFactory(new DiamondWidgetFactory());
        this.engine.registerNodeFactory(new MAWidgetFactory());
        this.engine.registerNodeFactory(new operatorWidgetFactory());
        this.engine.registerNodeFactory(new ConstantWidgetFactory());
        this.engine.registerNodeFactory(new BeginWidgetFactory());
    }

    onDropHandler(event) {
        let data = JSON.parse(event.dataTransfer.getData('storm-diagram-node'));
        let nodesCount = Lodash.keys(this.engine.getDiagramModel().getNodes()).length;
        let node = null;

        if (data.type === 'in') {
            node = new DefaultNodeModel('且 ' + (nodesCount + 1), 'peru');
            node.addPort(new DefaultPortModel(true, 'in-1', 'In'));
            node.addPort(new DefaultPortModel(false, 'out-1', 'Out'));
        } else if (data.type === 'out') {
            node = new DefaultNodeModel('或 ' + (nodesCount + 1), 'hotpink');
            node.addPort(new DefaultPortModel(true, 'in-1', 'In'));
            node.addPort(new DefaultPortModel(false, 'out-1', 'Out'));
        } else if (data.type === 'diamond') {
            node = new DiamondNodeModel('Node ' + (nodesCount + 1));
        } else if (data.type === 'MA') {
            node = new MANodeModel('Node ' + (nodesCount + 1));
        }
          else if (data.type === 'operator') {
            node = new operatorNodeModel('Node ' + (nodesCount + 1));
        }
          else if (data.type === 'Constant') {
            node = new ConstantNodeModel('Node ' + (nodesCount + 1));
        }
          else if (data.type === 'Begin') {
            node = new BeginNodeModel('Node ' + (nodesCount + 1));
        }

        if(node == null) {
            return;
        }

        let points = this.engine.getRelativeMousePoint(event);
        node.x = points.x;
        node.y = points.y;
        this.engine.getDiagramModel().addNode(node);

        this.forceUpdate();
    }

    render() {
        return (
            <div className="content">
                <Modal isOpen={this.state.modal} toggle={this.toggleModal} className={'node-modal'}>
                    <ModalHeader toggle={this.toggleModal}>{this.state.modalConfig.description}</ModalHeader>
                    <ModalBody>
                         Upload scripts here
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggleModal}>Save</Button>{' '}
                        <Button color="danger" onClick={this.toggleModal}>Delete</Button>{' '}
                        <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>

                <Container>
                    <Row>
                        <Col xs="4">
                            <br/><br/>
                            <Button color="primary" onClick={this.toggleModal}>{'添加自定义条件'}</Button>
                            <br/><br/>

                            {/* define the menu bar */}
                            <TrayWidget>
                                <TrayItemWidget model={{ type: 'in' }} name="且" color="peru" />
                                <TrayItemWidget model={{ type: 'out' }} name="或" color="hotpink" />
                                <TrayItemWidget model={{type: 'diamond'}} name={'买入'} color={'yellow'}/>
                                <TrayItemWidget model={{type: 'MA'}} name={'均线'} color={'green'}/>
                                <TrayItemWidget model={{type: 'operator'}} name={'关系符号'} color={'LightCyan'}/>
                                <TrayItemWidget model={{type: 'Constant'}} name={'常数'} color={'Bisque'}/>
                                <TrayItemWidget model={{type: 'Begin'}} name={'开始'} color={'red'}/>
                            </TrayWidget>
                        </Col>

                        <Col xs="8">
                            {/* define the canvas (diagram-layer)*/}
                            <div
                                className="diagram-layer"

                                onDrop={this.onDropHandler.bind(this)}

                                onDragOver={event => {
                                    event.preventDefault();
                                }}
                            >
                                <DiagramWidget diagramEngine={this.engine} />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Home;