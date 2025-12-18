import React, { useEffect } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import styles from './ImageModal.module.css';
import { MdClose } from 'react-icons/md';

Modal.setAppElement('#root');

const ImageModal = ({ isOpen, onClose, image }) => {
  useEffect(() => {
    if (!isOpen) return;

    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;

    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    if (scrollBarWidth > 0) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
    };
  }, [isOpen]);

  if (!image) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick
      shouldCloseOnEsc
      overlayClassName={styles.overlay}
      className={styles.modal}
      contentLabel="Image preview"
    >
      <button className={styles.closeBtn} onClick={onClose} type="button">
        <MdClose />
      </button>

      <img
        className={styles.image}
        src={image.largeImageURL}
        alt={image.tags}
      />
    </Modal>
  );
};

ImageModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  image: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};

export default ImageModal;
