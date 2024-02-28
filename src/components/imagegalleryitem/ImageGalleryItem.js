import { Modal } from 'components/modal/Modal';
import css from './imagegalleryitem.module.css';
import { useState } from 'react';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ src, alt }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <li className={css.ImageGalleryItem}>
      <img
        className={css.ImageGalleryItemImage}
        src={src}
        alt={alt}
        onClick={openModal}
      />

      {isModalOpen && <Modal imageUrl={src} alt={alt} onClose={closeModal} />}
    </li>
  );
};

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
