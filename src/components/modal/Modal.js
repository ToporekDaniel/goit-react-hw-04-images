import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './modal.module.css';

export const Modal = ({ imageUrl, alt, onClose }) => {
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

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={css.overlay} onClick={handleClickOutside}>
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
