import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './modal.module.css';

export const Modal = ({ imageUrl, alt, onClose }) => {
  useEffect(() => {
    const handleKeyPress = event => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = event => {
      if (event.target === event.currentTarget) {
        onClose();
      }
    };
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      className={css.overlay}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className={css.modal}>
        <img src={imageUrl} alt={alt} />
        <button onClick={onClose}>&#215;</button>
      </div>
    </div>
  );
};

Modal.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
