import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './modal.module.css';

export class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress = event => {
    if (event.key === 'Escape') {
      this.props.onClose();
    }
  };

  handleClickOutside = event => {
    if (event.target === event.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { imageUrl, alt, onClose } = this.props;

    return (
      <div className={css.overlay} onClick={this.handleClickOutside}>
        <div className={css.modal}>
          <img src={imageUrl} alt={alt} />
          <button onClick={onClose}>&#215;</button>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
