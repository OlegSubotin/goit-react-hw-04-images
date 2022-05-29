import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
    static propTypes = {
        onClose: PropTypes.func.isRequired,
        largeImage: PropTypes.string.isRequired,
    };

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    };

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    };

    handleKeyDown = e => {
        if (e.code === 'Escape') {
            this.props.onClose();
        };
    };

    backdropClick = e => {
        if (e.currentTarget === e.target) {
            this.props.onClose();
        };
    };

    render() {
        const { largeImage } = this.props;
        const { backdropClick } = this;
        return createPortal(
            <div className={s.overlay} onClick={backdropClick}>
                <div className={s.modal}>
                    <img src={largeImage} alt="#" />
                </div>
            </div>,
            modalRoot
        );
    };
};

export default Modal;

