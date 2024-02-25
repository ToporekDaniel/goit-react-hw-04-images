import { Modal } from 'components/modal/Modal';
import css from './imagegalleryitem.module.css';
import { Component } from 'react';
import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const { src, alt } = this.props;

    return (
      <li className={css.ImageGalleryItem}>
        <img
          className={css.ImageGalleryItemImage}
          src={src}
          alt={alt}
          onClick={this.openModal}
        />

        {this.state.isModalOpen && (
          <Modal imageUrl={src} alt={alt} onClose={this.closeModal} />
        )}
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
