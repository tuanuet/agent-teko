import React from 'react'
import { Modal} from 'antd';

class ConfirmModal extends React.Component {

    render() {
        return (
                <Modal
                    title={this.props.title}
                    visible={this.props.visible}
                    onOk={this.props.onOk}
                    onCancel={this.props.onCancel}
                    okText='Có'
                    cancelText='Không'
                >
                    {this.props.content.split('\n').map((item, key) => {
                        return <span key={key}>{item}<br/></span>
                    })}
                </Modal>
        );
    }
}

export default ConfirmModal;